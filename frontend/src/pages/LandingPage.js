import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Image, Video, FileText, GraduationCap, Bot } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-transparent"></div>
        
        <nav className="relative z-10 px-8 py-6 flex justify-between items-center glass-effect">
          <h1 className="text-3xl font-bold" style={{fontFamily: 'Chivo'}} data-testid="logo-text">P07</h1>
          <button 
            onClick={() => navigate('/dashboard')} 
            className="btn-primary"
            data-testid="nav-get-started-btn"
          >
            Get Started
          </button>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-32 text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-600/30 rounded-full text-sm font-semibold text-blue-400 mb-8" data-testid="badge-professional-ai">
              Professional AI Platform
            </span>
          </div>
          
          <h1 
            className="text-6xl md:text-8xl font-black mb-6 tracking-tight"
            style={{fontFamily: 'Chivo'}}
            data-testid="hero-title"
          >
            P07<br/>
            <span className="text-blue-500">AI Suite</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto" data-testid="hero-description">
            Advanced AI technology designed for high-level authorities, governments, and professionals.
            Fast, reliable, and powerful.
          </p>
          
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="btn-primary text-lg px-8 py-4"
              data-testid="hero-get-started-btn"
            >
              Launch Platform
            </button>
            <button 
              onClick={() => navigate('/learning')} 
              className="btn-secondary text-lg px-8 py-4"
              data-testid="hero-learn-more-btn"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-8 py-20" data-testid="features-section">
        <h2 className="text-4xl font-bold text-center mb-16" style={{fontFamily: 'Chivo'}} data-testid="features-title">
          Complete AI Ecosystem
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Bot size={32} />}
            title="P07 Chat"
            description="Dual-model AI chat powered by GPT-5.2 and Claude Sonnet 4.5"
            testId="feature-chat"
          />
          <FeatureCard
            icon={<Image size={32} />}
            title="SP07 Images"
            description="Generate ultra-realistic, high-resolution images instantly"
            testId="feature-images"
          />
          <FeatureCard
            icon={<Video size={32} />}
            title="Video Creation"
            description="Create professional videos with Sora 2 technology"
            testId="feature-video"
          />
          <FeatureCard
            icon={<FileText size={32} />}
            title="FP07 Templates"
            description="Pre-designed templates for blogs, websites, and documents"
            testId="feature-templates"
          />
          <FeatureCard
            icon={<FileText size={32} />}
            title="FP07 Documents"
            description="Generate PDFs, PowerPoints, and Excel files instantly"
            testId="feature-documents"
          />
          <FeatureCard
            icon={<GraduationCap size={32} />}
            title="Learning Corner"
            description="Free tutorials to master AI tools effectively"
            testId="feature-learning"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-8 py-20 text-center">
        <div className="glass-effect rounded-2xl p-16 tracing-border">
          <h2 className="text-5xl font-bold mb-6" style={{fontFamily: 'Chivo'}} data-testid="cta-title">
            Trusted by Governments & Authorities
          </h2>
          <p className="text-xl text-gray-400 mb-8" data-testid="cta-description">
            Built for high-level decision makers who demand reliability and performance
          </p>
          <button 
            onClick={() => navigate('/dashboard')} 
            className="btn-primary text-lg px-10 py-4"
            data-testid="cta-start-btn"
          >
            Start Using P07
          </button>
        </div>
      </div>

      {/* Footer - About */}
      <div className="max-w-7xl mx-auto px-8 py-12 border-t border-white/10">
        <div className="text-center">
          <p className="text-gray-400 mb-2">
            Founded by <span className="text-blue-500 font-bold">SOHAN MAHAPATRA</span>
          </p>
          <p className="text-gray-500 text-sm">
            Co-founded with Emergent Team • Professional AI Suite for Global Authorities
          </p>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, testId }) => (
  <div className="glass-effect p-8 rounded-xl tracing-border hover:border-blue-600/50 transition-all group" data-testid={testId}>
    <div className="text-blue-500 mb-4 group-hover:scale-110 transition-transform" data-testid={`${testId}-icon`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3" style={{fontFamily: 'Chivo'}} data-testid={`${testId}-title`}>
      {title}
    </h3>
    <p className="text-gray-400" data-testid={`${testId}-description`}>{description}</p>
  </div>
);

export default LandingPage;