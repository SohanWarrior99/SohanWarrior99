import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Download, Zap } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DocumentsPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [docType, setDocType] = useState('pdf');
  const [loading, setLoading] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState(null);

  const generateDocument = async () => {
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    setGeneratedDoc(null);

    try {
      const response = await axios.post(`${API}/document/generate`, {
        title: title,
        content: content,
        doc_type: docType
      });

      if (response.data.success) {
        setGeneratedDoc(response.data);
      }
    } catch (error) {
      console.error('Document generation error:', error);
      alert('Failed to generate document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white p-8 relative" data-testid="documents-page">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/dashboard')} className="hover:text-yellow-400 transition hover:scale-110" data-testid="back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-5xl font-bold glow-text flex items-center gap-3" style={{fontFamily: 'Chivo'}} data-testid="page-title">
            <FileText size={48} /> FP07 Document Generator
          </h1>
        </div>

        <div className="document-theme p-8 rounded-3xl mb-8 cosmic-card">
          <div className="mb-6">
            <label className="block text-sm text-gray-300 mb-2 font-semibold" data-testid="title-label">📄 Document Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your document title..."
              className="w-full cosmic-glow rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-yellow-500 transition bg-transparent"
              disabled={loading}
              data-testid="title-input"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-300 mb-2 font-semibold" data-testid="content-label">📝 Document Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your document content..."
              rows={10}
              className="w-full cosmic-glow rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-yellow-500 transition resize-none bg-transparent"
              disabled={loading}
              data-testid="content-textarea"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-300 mb-2 font-semibold" data-testid="type-label">📋 Document Type</label>
            <div className="grid grid-cols-3 gap-4">
              {['pdf', 'pptx', 'xlsx'].map(type => (
                <button
                  key={type}
                  onClick={() => setDocType(type)}
                  className={`py-4 rounded-xl transition font-bold ${docType === type ? 'bg-gradient-to-r from-yellow-500 to-amber-500 shadow-lg shadow-yellow-500/50' : 'cosmic-glow hover:scale-105'}`}
                  disabled={loading}
                  data-testid={`type-${type}-btn`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateDocument}
            disabled={loading || !title.trim() || !content.trim()}
            className="w-full py-5 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:scale-105 transition shadow-lg shadow-yellow-500/50"
            data-testid="generate-btn"
          >
            <Zap size={24} />
            Generate Document
          </button>
        </div>

        {loading && (
          <div className="document-theme p-20 rounded-3xl text-center cosmic-card" data-testid="loading-indicator">
            <div className="inline-block w-20 h-20 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-2xl font-bold glow-text">Generating your document...</p>
          </div>
        )}

        {generatedDoc && (
          <div className="document-theme p-8 rounded-3xl cosmic-card" data-testid="document-result">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-2 glow-text" style={{fontFamily: 'Chivo'}} data-testid="result-title">
                  ✨ Document Generated!
                </h3>
                <p className="text-gray-300" data-testid="result-info">
                  {title} - {generatedDoc.doc_type.toUpperCase()}
                </p>
              </div>
              <a
                href={`${API}/document/download/${generatedDoc.doc_id}/${generatedDoc.doc_type}`}
                download={`${title}.${generatedDoc.doc_type}`}
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition shadow-lg shadow-yellow-500/50"
                data-testid="download-btn"
              >
                <Download size={20} />
                Download
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;