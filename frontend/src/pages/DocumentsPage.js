import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Download } from 'lucide-react';
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
    <div className="min-h-screen bg-[#050505] text-white p-8" data-testid="documents-page">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/dashboard')} className="hover:text-blue-500 transition" data-testid="back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-4xl font-bold" style={{fontFamily: 'Chivo'}} data-testid="page-title">FP07 Document Generator</h1>
        </div>

        <div className="glass-effect p-8 rounded-2xl mb-8">
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2" data-testid="title-label">Document Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter document title..."
              className="w-full bg-gray-900 border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-blue-500 transition"
              disabled={loading}
              data-testid="title-input"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2" data-testid="content-label">Document Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter document content..."
              rows={8}
              className="w-full bg-gray-900 border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-blue-500 transition resize-none"
              disabled={loading}
              data-testid="content-textarea"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2" data-testid="type-label">Document Type</label>
            <div className="grid grid-cols-3 gap-4">
              {['pdf', 'pptx', 'xlsx'].map(type => (
                <button
                  key={type}
                  onClick={() => setDocType(type)}
                  className={`py-3 rounded-lg transition ${docType === type ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'}`}
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
            className="btn-primary w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            data-testid="generate-btn"
          >
            <FileText size={20} />
            Generate Document
          </button>
        </div>

        {loading && (
          <div className="glass-effect p-20 rounded-2xl text-center" data-testid="loading-indicator">
            <div className="inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xl text-gray-400">Generating your document...</p>
          </div>
        )}

        {generatedDoc && (
          <div className="glass-effect p-8 rounded-2xl" data-testid="document-result">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2" style={{fontFamily: 'Chivo'}} data-testid="result-title">
                  Document Generated!
                </h3>
                <p className="text-gray-400" data-testid="result-info">
                  {title} - {generatedDoc.doc_type.toUpperCase()}
                </p>
              </div>
              <a
                href={`${API}/document/download/${generatedDoc.doc_id}/${generatedDoc.doc_type}`}
                download={`${title}.${generatedDoc.doc_type}`}
                className="btn-primary flex items-center gap-2"
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