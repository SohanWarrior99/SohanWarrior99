import requests
import sys
import json
from datetime import datetime

class P07APITester:
    def __init__(self, base_url="https://ai-content-forge-69.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []
        self.session_id = f"test-session-{datetime.now().strftime('%Y%m%d-%H%M%S')}"

    def run_test(self, name, method, endpoint, expected_status, data=None, timeout=30):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}" if endpoint else self.api_url
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=timeout)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=timeout)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {str(response.text)[:100]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            # Store result
            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_preview": response.text[:100] if not success else "OK"
            })

            return success, response.json() if success else {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout after {timeout}s")
            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "TIMEOUT",
                "success": False,
                "response_preview": f"Timeout after {timeout}s"
            })
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "response_preview": str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "", 200)

    def test_init_data(self):
        """Initialize templates and tutorials data"""
        return self.run_test("Initialize Data", "POST", "init/data", 200)

    def test_chat_openai(self):
        """Test chat with OpenAI GPT-5.2"""
        data = {
            "message": "Hello, this is a test message",
            "session_id": self.session_id,
            "model": "openai"
        }
        return self.run_test("Chat with GPT-5.2", "POST", "chat", 200, data, timeout=60)

    def test_chat_claude(self):
        """Test chat with Claude 4.5"""
        data = {
            "message": "Hello Claude, this is a test message",
            "session_id": self.session_id,
            "model": "claude"
        }
        return self.run_test("Chat with Claude 4.5", "POST", "chat", 200, data, timeout=60)

    def test_chat_history(self):
        """Test chat history retrieval"""
        return self.run_test("Chat History", "GET", f"chat/history/{self.session_id}", 200)

    def test_image_generation(self):
        """Test image generation with SP07"""
        data = {
            "prompt": "A beautiful sunset over mountains"
        }
        return self.run_test("Image Generation (SP07)", "POST", "image/generate", 200, data, timeout=120)

    def test_video_generation(self):
        """Test video generation with Sora 2"""
        data = {
            "prompt": "A serene lake with gentle waves",
            "duration": 4,
            "size": "1280x720"
        }
        return self.run_test("Video Generation (Sora 2)", "POST", "video/generate", 200, data, timeout=300)

    def test_document_generation_pdf(self):
        """Test PDF document generation"""
        data = {
            "title": "Test Document",
            "content": "This is a test document content for P07 platform testing.",
            "doc_type": "pdf"
        }
        return self.run_test("PDF Generation", "POST", "document/generate", 200, data)

    def test_document_generation_pptx(self):
        """Test PowerPoint document generation"""
        data = {
            "title": "Test Presentation",
            "content": "This is a test presentation content for P07 platform testing.",
            "doc_type": "pptx"
        }
        return self.run_test("PowerPoint Generation", "POST", "document/generate", 200, data)

    def test_document_generation_xlsx(self):
        """Test Excel document generation"""
        data = {
            "title": "Test Spreadsheet",
            "content": "This is a test spreadsheet content for P07 platform testing.",
            "doc_type": "xlsx"
        }
        return self.run_test("Excel Generation", "POST", "document/generate", 200, data)

    def test_templates_all(self):
        """Test templates retrieval"""
        return self.run_test("Get All Templates", "GET", "templates", 200)

    def test_templates_by_category(self):
        """Test templates by category"""
        return self.run_test("Get Blog Templates", "GET", "templates/blog", 200)

    def test_tutorials_all(self):
        """Test tutorials retrieval"""
        return self.run_test("Get All Tutorials", "GET", "tutorials", 200)

    def test_tutorials_by_category(self):
        """Test tutorials by category"""
        return self.run_test("Get Chat Tutorials", "GET", "tutorials/chat", 200)

def main():
    print("🚀 Starting P07 AI Platform Backend Testing")
    print("=" * 60)
    
    tester = P07APITester()

    # Test sequence
    print("\n📋 BASIC API TESTS")
    tester.test_root_endpoint()
    tester.test_init_data()

    print("\n📚 TEMPLATES & TUTORIALS TESTS")
    tester.test_templates_all()
    tester.test_templates_by_category()
    tester.test_tutorials_all()
    tester.test_tutorials_by_category()

    print("\n💬 CHAT FUNCTIONALITY TESTS")
    tester.test_chat_openai()
    tester.test_chat_claude()
    tester.test_chat_history()

    print("\n🎨 AI GENERATION TESTS")
    tester.test_image_generation()
    # Note: Video generation takes very long, testing separately
    print("\n🎬 VIDEO GENERATION TEST (This may take several minutes)")
    tester.test_video_generation()

    print("\n📄 DOCUMENT GENERATION TESTS")
    tester.test_document_generation_pdf()
    tester.test_document_generation_pptx()
    tester.test_document_generation_xlsx()

    # Print final results
    print("\n" + "=" * 60)
    print(f"📊 FINAL RESULTS: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    failed_tests = [test for test in tester.test_results if not test['success']]
    if failed_tests:
        print("\n❌ FAILED TESTS:")
        for test in failed_tests:
            print(f"   • {test['name']}: {test['actual_status']} - {test['response_preview']}")
    else:
        print("\n🎉 All tests passed!")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())