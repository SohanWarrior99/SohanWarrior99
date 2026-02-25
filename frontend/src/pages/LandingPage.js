import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Image, Video, FileText, GraduationCap, Palette, Mail, MapPin, Phone } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white relative">
      <div className="luxury-bg"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <nav className="relative z-10 px-8 py-6 flex justify-between items-center floating-card mx-4 mt-4">
          <h1 className="text-4xl font-bold gradient-text" style={{fontFamily: 'Playfair Display'}} data-testid="logo-text">
            P07
          </h1>
          <button 
            onClick={() => navigate('/dashboard')} 
            className="btn-luxury"
            data-testid="nav-get-started-btn"
          >
            Enter Platform
          </button>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-32 text-center">
          <div className="mb-8 animate-float">
            <span className="inline-block px-6 py-3 floating-card text-sm font-semibold gold-accent mb-8" data-testid="badge-professional-ai">
              ✦ Elite AI Excellence ✦
            </span>
          </div>
          
          <h1 
            className="text-7xl md:text-9xl font-black mb-6 tracking-tight text-glow"
            style={{fontFamily: 'Playfair Display'}}\n            data-testid="hero-title"
          >
            <span className="gradient-text">P07</span>
            <br/>
            <span className="text-5xl md:text-6xl" style={{fontFamily: 'Inter'}}>The Pinnacle of AI</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light" style={{lineHeight: '1.8'}} data-testid="hero-description">
            Experience unparalleled artificial intelligence crafted for distinguished leaders,\n            government institutions, and visionary professionals.\n          </p>
          
          <div className="flex gap-6 justify-center">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="btn-luxury text-xl px-12 py-5"
              data-testid="hero-get-started-btn"
            >
              Begin Your Journey
            </button>
            <button 
              onClick={() => document.getElementById('about').scrollIntoView({behavior: 'smooth'})} 
              className="btn-secondary-luxury text-xl px-12 py-5"
              data-testid="hero-learn-more-btn"
            >
              Discover More
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-8 py-20 relative z-10" data-testid="features-section">
        <h2 className="text-5xl font-bold text-center mb-4 gradient-text" style={{fontFamily: 'Playfair Display'}} data-testid="features-title">
          Distinguished Capabilities
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg">Six exceptional tools, infinite possibilities</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Bot size={40} />}
            title="P07 Chat"
            description="Sophisticated AI conversations powered by GPT-5.2 and Claude Sonnet 4.5"
            delay="0s"
            testId="feature-chat"
          />
          <FeatureCard
            icon={<Image size={40} />}
            title="SP07 Images"
            description="Generate exquisite, high-resolution imagery with Gemini Nano Banana"
            delay="0.1s"
            testId="feature-images"
          />
          <FeatureCard
            icon={<Video size={40} />}
            title="Video Creation"
            description="Craft professional cinematic videos with Sora 2 technology"
            delay="0.2s"
            testId="feature-video"
          />
          <FeatureCard
            icon={<Palette size={40} />}
            title="FP07 Templates"
            description="Curated collection of premium templates for discerning users"
            delay="0.3s"
            testId="feature-templates"
          />
          <FeatureCard
            icon={<FileText size={40} />}
            title="FP07 Documents"
            description="Generate impeccable PDFs, presentations, and spreadsheets"
            delay="0.4s"
            testId="feature-documents"
          />
          <FeatureCard
            icon={<GraduationCap size={40} />}
            title="Learning Corner"
            description="Exclusive tutorials for mastering AI excellence"
            delay="0.5s"
            testId="feature-learning"
          />
        </div>
      </div>

      <div className="luxury-divider max-w-6xl mx-auto"></div>

      {/* About Section */}
      <div id="about" className="max-w-6xl mx-auto px-8 py-20 relative z-10" data-testid="about-section">
        <div className="floating-card p-16">
          <h2 className="text-6xl font-bold text-center mb-12 gradient-text" style={{fontFamily: 'Playfair Display'}}>
            About P07
          </h2>
          
          <div className="space-y-8 text-lg text-gray-300" style={{lineHeight: '1.9'}}>
            <p className="text-2xl text-center gold-accent font-semibold mb-8">
              The Future of Artificial Intelligence, Redefined
            </p>
            
            <p>
              <strong className="gold-accent">P07</strong> represents the zenith of artificial intelligence technology, meticulously designed for high-level authorities, government institutions, and distinguished professionals who demand nothing less than excellence.
            </p>
            
            <p>
              Our platform seamlessly integrates the world's most advanced AI models - <strong className="gold-accent">GPT-5.2</strong>, <strong className="gold-accent">Claude Sonnet 4.5</strong>, <strong className="gold-accent">Gemini Nano Banana</strong>, and <strong className="gold-accent">Sora 2</strong> - delivering unprecedented capabilities across multiple domains.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="floating-card p-8">
                <h3 className="text-2xl font-bold mb-4 gold-accent" style={{fontFamily: 'Playfair Display'}}>Our Vision</h3>
                <p className="text-gray-300">
                  To empower leaders and innovators with AI tools that transcend conventional boundaries, fostering informed decision-making and creative excellence.
                </p>
              </div>
              
              <div className="floating-card p-8">
                <h3 className="text-2xl font-bold mb-4 gold-accent" style={{fontFamily: 'Playfair Display'}}>Our Promise</h3>
                <p className="text-gray-300">
                  Uncompromising quality, lightning-fast performance, and an experience that reflects the sophistication of our distinguished clientele.
                </p>
              </div>
            </div>

            <div className="my-12">
              <h3 className="text-3xl font-bold mb-6 text-center gold-accent" style={{fontFamily: 'Playfair Display'}}>
                Key Features
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6">
                  <div className="text-4xl gold-accent mb-3">⚡</div>
                  <h4 className="font-bold mb-2">Instant Response</h4>
                  <p className="text-sm text-gray-400">Lightning-fast AI processing without lag</p>
                </div>
                <div className="text-center p-6">
                  <div className="text-4xl gold-accent mb-3">🎯</div>
                  <h4 className="font-bold mb-2">Precision & Accuracy</h4>
                  <p className="text-sm text-gray-400">Source-based, reliable information</p>
                </div>
                <div className="text-center p-6">
                  <div className="text-4xl gold-accent mb-3">🔒</div>
                  <h4 className="font-bold mb-2">Enterprise Grade</h4>
                  <p className="text-sm text-gray-400">Trusted by governments worldwide</p>
                </div>
              </div>
            </div>

            <p className="text-center text-xl mt-12">
              Founded by <strong className="gradient-text text-2xl">SOHAN MAHAPATRA</strong>, in collaboration with the <strong className="gold-accent">Emergent Team</strong>, P07 stands as a testament to innovation and excellence.
            </p>
          </div>
        </div>
      </div>

      <div className="luxury-divider max-w-6xl mx-auto"></div>

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto px-8 py-20 relative z-10 mb-20" data-testid="contact-section">
        <div className="floating-card p-16 text-center">
          <h2 className="text-6xl font-bold mb-6 gradient-text" style={{fontFamily: 'Playfair Display'}}>
            Contact Us
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Connect with our distinguished team for inquiries and support\n          </p>
          
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="floating-card p-8 flex items-center gap-6 hover-lift">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 flex items-center justify-center flex-shrink-0">
                <Mail size={28} className="text-white" />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-sm text-gray-400 mb-1">Email Address</h3>
                <a href="mailto:sohanprivate7@gmail.com" className="text-xl gold-accent hover:text-yellow-400 transition">
                  sohanprivate7@gmail.com
                </a>
              </div>
            </div>

            <div className="floating-card p-8">
              <h3 className="text-2xl font-bold mb-4 gold-accent" style={{fontFamily: 'Playfair Display'}}>
                Support & Inquiries
              </h3>
              <p className="text-gray-300">
                For enterprise solutions, partnerships, or technical support, reach out to our dedicated team.\n                We respond to all inquiries within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-8 text-center text-gray-500 text-sm">
          <p className="mb-2">
            © 2026 P07 AI. Founded by <span className="gold-accent font-semibold">SOHAN MAHAPATRA</span>
          </p>
          <p>
            Co-founded with Emergent Team • Elite AI Platform for Global Authorities
          </p>
        </div>
      </div>
    </div>
  );
};\n\nconst FeatureCard = ({ icon, title, description, delay, testId }) => (\n  <div \n    className=\"floating-card p-10 hover-lift animate-float\"\n    style={{animationDelay: delay}}\n    data-testid={testId}\n  >\n    <div className=\"w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-600/20 to-yellow-900/20 flex items-center justify-center mb-6 gold-border\" data-testid={`${testId}-icon`}>\n      <div className=\"gold-accent\">\n        {icon}\n      </div>\n    </div>\n    <h3 className=\"text-2xl font-bold mb-4 gold-accent\" style={{fontFamily: 'Playfair Display'}} data-testid={`${testId}-title`}>\n      {title}\n    </h3>\n    <p className=\"text-gray-400 leading-relaxed\" data-testid={`${testId}-description`}>{description}</p>\n  </div>\n);\n\nexport default LandingPage;
