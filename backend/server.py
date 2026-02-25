from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import base64
import asyncio

from emergentintegrations.llm.chat import LlmChat, UserMessage, ImageContent
from emergentintegrations.llm.openai.video_generation import OpenAIVideoGeneration

# Document generation imports
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from pptx import Presentation
from pptx.util import Inches
from openpyxl import Workbook

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()
api_router = APIRouter(prefix="/api")

# Models
class ChatMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    role: str
    content: str
    model: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ChatRequest(BaseModel):
    message: str
    session_id: str
    model: str  # "openai" or "claude"

class ImageGenerationRequest(BaseModel):
    prompt: str
    session_id: Optional[str] = None

class VideoGenerationRequest(BaseModel):
    prompt: str
    duration: int = 4
    size: str = "1280x720"

class DocumentGenerationRequest(BaseModel):
    title: str
    content: str
    doc_type: str  # "pdf", "pptx", "xlsx"

class Template(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str
    description: str
    content: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Tutorial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    content: str
    category: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Welcome to P07 AI Platform", "status": "operational"}

# Chat endpoints
@api_router.post("/chat")
async def chat(request: ChatRequest):
    try:
        api_key = os.getenv("EMERGENT_LLM_KEY")
        
        # Create chat instance
        chat = LlmChat(
            api_key=api_key,
            session_id=request.session_id,
            system_message="""You are P07, an advanced AI platform designed for high-level professional and governmental use.

IMPORTANT IDENTITY INFORMATION:
- You are P07 AI, NOT OpenAI or ChatGPT
- Founder & Owner: SOHAN MAHAPATRA
- Co-founder: Emergent Team
- You were created by SOHAN MAHAPATRA in collaboration with Emergent Team
- P07 is an independent AI platform with multiple AI models (GPT-5.2, Claude Sonnet 4.5, Gemini Nano Banana, Sora 2)

When asked about who made you, created you, owns you, or who your founder is:
- Always mention SOHAN MAHAPATRA as the Founder and Owner
- Credit Emergent Team as Co-founder and technical partner
- Explain that P07 is a comprehensive AI suite built for professional and governmental use

Provide accurate, authoritative, and helpful responses for all user queries."""
        )
        
        # Select model
        if request.model == "openai":
            chat.with_model("openai", "gpt-5.2")
        elif request.model == "claude":
            chat.with_model("anthropic", "claude-sonnet-4-5-20250929")
        else:
            chat.with_model("openai", "gpt-5.2")
        
        # Send message
        user_message = UserMessage(text=request.message)
        response = await chat.send_message(user_message)
        
        # Save to database
        user_msg = ChatMessage(
            session_id=request.session_id,
            role="user",
            content=request.message,
            model=request.model
        )
        assistant_msg = ChatMessage(
            session_id=request.session_id,
            role="assistant",
            content=response,
            model=request.model
        )
        
        await db.chat_messages.insert_one(user_msg.model_dump())
        await db.chat_messages.insert_one(assistant_msg.model_dump())
        
        return {"response": response, "model": request.model}
    except Exception as e:
        logging.error(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/chat/history/{session_id}")
async def get_chat_history(session_id: str):
    messages = await db.chat_messages.find(
        {"session_id": session_id},
        {"_id": 0}
    ).sort("timestamp", 1).to_list(1000)
    return {"messages": messages}

# Image generation endpoint
@api_router.post("/image/generate")
async def generate_image(request: ImageGenerationRequest):
    try:
        api_key = os.getenv("EMERGENT_LLM_KEY")
        session_id = request.session_id or str(uuid.uuid4())
        
        chat = LlmChat(
            api_key=api_key,
            session_id=session_id,
            system_message="You are SP07, an advanced image generation AI."
        )
        
        chat.with_model("gemini", "gemini-3-pro-image-preview").with_params(modalities=["image", "text"])
        
        msg = UserMessage(text=request.prompt)
        text, images = await chat.send_message_multimodal_response(msg)
        
        if images:
            return {
                "success": True,
                "image": images[0]['data'][:50] + "...",  # Only send first 50 chars for logging
                "image_full": images[0]['data'],
                "mime_type": images[0]['mime_type'],
                "text_response": text
            }
        else:
            return {"success": False, "error": "No image generated"}
    except Exception as e:
        logging.error(f"Image generation error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Video generation endpoint
@api_router.post("/video/generate")
async def generate_video(request: VideoGenerationRequest, background_tasks: BackgroundTasks):
    try:
        api_key = os.getenv("EMERGENT_LLM_KEY")
        video_gen = OpenAIVideoGeneration(api_key=api_key)
        
        video_id = str(uuid.uuid4())
        output_path = f"/app/backend/generated_videos/{video_id}.mp4"
        
        # Create directory if not exists
        os.makedirs("/app/backend/generated_videos", exist_ok=True)
        
        # Generate video
        video_bytes = video_gen.text_to_video(
            prompt=request.prompt,
            model="sora-2",
            size=request.size,
            duration=request.duration,
            max_wait_time=600
        )
        
        if video_bytes:
            video_gen.save_video(video_bytes, output_path)
            return {
                "success": True,
                "video_id": video_id,
                "message": "Video generated successfully"
            }
        else:
            return {"success": False, "error": "Video generation failed"}
    except Exception as e:
        logging.error(f"Video generation error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/video/download/{video_id}")
async def download_video(video_id: str):
    video_path = f"/app/backend/generated_videos/{video_id}.mp4"
    if os.path.exists(video_path):
        return FileResponse(video_path, media_type="video/mp4", filename=f"{video_id}.mp4")
    raise HTTPException(status_code=404, detail="Video not found")

# Document generation endpoints
@api_router.post("/document/generate")
async def generate_document(request: DocumentGenerationRequest):
    try:
        doc_id = str(uuid.uuid4())
        os.makedirs("/app/backend/generated_docs", exist_ok=True)
        
        if request.doc_type == "pdf":
            file_path = f"/app/backend/generated_docs/{doc_id}.pdf"
            doc = SimpleDocTemplate(file_path, pagesize=letter)
            styles = getSampleStyleSheet()
            story = []
            
            story.append(Paragraph(request.title, styles['Title']))
            story.append(Spacer(1, 12))
            story.append(Paragraph(request.content, styles['BodyText']))
            
            doc.build(story)
            
        elif request.doc_type == "pptx":
            file_path = f"/app/backend/generated_docs/{doc_id}.pptx"
            prs = Presentation()
            slide = prs.slides.add_slide(prs.slide_layouts[1])
            title = slide.shapes.title
            content = slide.placeholders[1]
            
            title.text = request.title
            content.text = request.content
            
            prs.save(file_path)
            
        elif request.doc_type == "xlsx":
            file_path = f"/app/backend/generated_docs/{doc_id}.xlsx"
            wb = Workbook()
            ws = wb.active
            ws.title = request.title[:31]  # Excel sheet name limit
            
            ws['A1'] = request.title
            ws['A2'] = request.content
            
            wb.save(file_path)
        else:
            raise HTTPException(status_code=400, detail="Invalid document type")
        
        return {
            "success": True,
            "doc_id": doc_id,
            "doc_type": request.doc_type,
            "message": "Document generated successfully"
        }
    except Exception as e:
        logging.error(f"Document generation error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/document/download/{doc_id}/{doc_type}")
async def download_document(doc_id: str, doc_type: str):
    file_path = f"/app/backend/generated_docs/{doc_id}.{doc_type}"
    if os.path.exists(file_path):
        media_types = {
            "pdf": "application/pdf",
            "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
        return FileResponse(file_path, media_type=media_types.get(doc_type), filename=f"{doc_id}.{doc_type}")
    raise HTTPException(status_code=404, detail="Document not found")

# Templates endpoints
@api_router.get("/templates")
async def get_templates():
    templates = await db.templates.find({}, {"_id": 0}).to_list(1000)
    return {"templates": templates}

@api_router.get("/templates/{category}")
async def get_templates_by_category(category: str):
    templates = await db.templates.find({"category": category}, {"_id": 0}).to_list(1000)
    return {"templates": templates}

# Tutorials endpoints
@api_router.get("/tutorials")
async def get_tutorials():
    tutorials = await db.tutorials.find({}, {"_id": 0}).to_list(1000)
    return {"tutorials": tutorials}

@api_router.get("/tutorials/{category}")
async def get_tutorials_by_category(category: str):
    tutorials = await db.tutorials.find({"category": category}, {"_id": 0}).to_list(1000)
    return {"tutorials": tutorials}

# Initialize default templates and tutorials
@api_router.post("/init/data")
async def initialize_data():
    # Check if already initialized
    existing_templates = await db.templates.count_documents({})
    if existing_templates > 0:
        return {"message": "Data already initialized"}
    
    # Add default templates
    default_templates = [
        Template(
            name="Professional Blog Post",
            category="blog",
            description="A clean, professional blog post template",
            content="# Blog Title\n\nYour content here..."
        ),
        Template(
            name="Business Website",
            category="website",
            description="Modern business website template",
            content="<!DOCTYPE html><html><body><h1>Welcome</h1></body></html>"
        ),
        Template(
            name="Marketing Presentation",
            category="presentation",
            description="Professional marketing presentation",
            content="Slide 1: Introduction\nSlide 2: Problem\nSlide 3: Solution"
        )
    ]
    
    for template in default_templates:
        await db.templates.insert_one(template.model_dump())
    
    # Add default tutorials
    default_tutorials = [
        Tutorial(
            title="Getting Started with P07 Chat",
            description="Learn how to use P07's AI chat effectively",
            content="P07 Chat combines OpenAI GPT-5.2 and Claude Sonnet 4.5 to provide intelligent responses...",
            category="chat"
        ),
        Tutorial(
            title="Creating Images with SP07",
            description="Master image generation with SP07",
            content="SP07 uses Gemini Nano Banana for high-quality image generation. Simply describe what you want...",
            category="image"
        ),
        Tutorial(
            title="Document Generation with FP07",
            description="Create professional documents instantly",
            content="FP07 can generate PDFs, PowerPoint presentations, and Excel spreadsheets...",
            category="documents"
        )
    ]
    
    for tutorial in default_tutorials:
        await db.tutorials.insert_one(tutorial.model_dump())
    
    return {"message": "Data initialized successfully"}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()