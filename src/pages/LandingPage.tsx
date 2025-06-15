
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { 
  Code2, 
  Sparkles, 
  Database, 
  FileText, 
  Zap, 
  Github, 
  Twitter, 
  Linkedin,
  ArrowRight,
  CheckCircle,
  Rocket,
  Layers,
  Download
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-blue"></div>
      </div>
    );
  }

  // Don't render landing page for authenticated users
  if (user) {
    return null;
  }

  const features = [
    {
      icon: Zap,
      title: "StackWizard+",
      description: "Generate complete tech stacks and project roadmaps with AI-powered recommendations",
      color: "text-neon-blue"
    },
    {
      icon: FileText,
      title: "PromptRefiner",
      description: "Optimize your AI prompts for better results with intelligent suggestions",
      color: "text-neon-purple"
    },
    {
      icon: Database,
      title: "SQLDoctor",
      description: "Analyze, optimize, and debug SQL queries with performance insights",
      color: "text-neon-orange"
    },
    {
      icon: Code2,
      title: "CodeLens",
      description: "Deep code analysis with security, performance, and quality recommendations",
      color: "text-neon-green"
    },
    {
      icon: Download,
      title: "TestCaseGen",
      description: "Generate comprehensive test cases for your applications automatically",
      color: "text-neon-pink"
    }
  ];

  const techStack = [
    { name: "React", logo: "⚛️" },
    { name: "TypeScript", logo: "📘" },
    { name: "Supabase", logo: "🟢" },
    { name: "Tailwind", logo: "🎨" },
    { name: "OpenAI", logo: "🤖" },
    { name: "Vercel", logo: "▲" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Floating Grid Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translate(${scrollY * 0.5}px, ${scrollY * 0.3}px)`
          }}
        />
      </div>

      {/* Sticky Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-dark border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-sora bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                DevSynth AI
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-white transition-colors">Features</a>
              <a href="#modules" className="text-muted-foreground hover:text-white transition-colors">Modules</a>
              <a href="#tech" className="text-muted-foreground hover:text-white transition-colors">Tech Stack</a>
            </div>

            <button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-2 rounded-xl font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Login to Use
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold font-sora mb-6 leading-tight">
              AI-Powered
              <span className="block bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent animate-glow">
                Developer Suite
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Supercharge your development workflow with intelligent code analysis, 
              SQL optimization, and AI-driven productivity tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-neon-blue to-neon-purple px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-3 neon-glow"
              >
                <Rocket className="w-5 h-5" />
                Start Building Now
              </button>
              
              <button className="glass-dark px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-3">
                <Github className="w-5 h-5" />
                View on GitHub
              </button>
            </div>
          </div>

          {/* Animated 3D Visual */}
          <div className="mt-16 relative">
            <div className="w-full max-w-4xl mx-auto h-96 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 rounded-3xl animate-pulse"></div>
              <div className="absolute inset-4 glass-dark rounded-2xl flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 p-8">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-16 h-16 rounded-xl animate-float bg-gradient-to-br ${
                        i % 3 === 0 ? 'from-neon-blue to-neon-cyan' :
                        i % 3 === 1 ? 'from-neon-purple to-neon-pink' :
                        'from-neon-green to-neon-emerald'
                      }`}
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is this platform */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in">
              <h2 className="text-4xl font-bold font-sora mb-6">
                What is <span className="text-neon-blue">DevSynth AI</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                DevSynth AI is the ultimate productivity suite for modern developers. 
                Our platform combines cutting-edge AI with intuitive design to help you 
                write better code, optimize databases, and accelerate your development workflow.
              </p>
              <div className="space-y-4">
                {[
                  "AI-powered code analysis and optimization",
                  "Intelligent SQL query debugging",
                  "Automated test case generation",
                  "Project planning and tech stack recommendations"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-neon-green" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-dark p-8 rounded-2xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground ml-4">devsynth-ai.terminal</span>
                  </div>
                  <div className="font-mono text-sm space-y-2">
                    <div className="text-neon-green">$ devsynth analyze --query="SELECT * FROM users"</div>
                    <div className="text-muted-foreground">🔍 Analyzing SQL query...</div>
                    <div className="text-neon-blue">✅ Performance: 85/100</div>
                    <div className="text-neon-orange">⚠️  Recommendation: Avoid SELECT *</div>
                    <div className="text-neon-purple">🚀 Optimized query generated</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-sora mb-4">
              Powerful <span className="text-neon-purple">Features</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to supercharge your development workflow in one integrated platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-dark p-6 rounded-2xl hover:scale-105 transition-all duration-300 animate-fade-in hover:neon-glow group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-current to-current p-3 mb-4 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Modules */}
      <section id="modules" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-sora mb-4">
              Integrated <span className="text-neon-green">Modules</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Each module is designed to work seamlessly together for maximum productivity.
            </p>
          </div>

          <div className="relative">
            <div className="flex flex-wrap justify-center gap-6">
              {features.map((module, index) => (
                <div
                  key={index}
                  className="glass-dark px-6 py-3 rounded-full hover:scale-110 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <module.icon className={`w-5 h-5 ${module.color} group-hover:animate-glow`} />
                    <span className="font-medium">{module.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-sora mb-4">
              Built with <span className="text-neon-orange">Modern Tech</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Powered by the latest and greatest technologies for optimal performance.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="glass-dark p-6 rounded-2xl text-center hover:scale-110 transition-all duration-300 animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-3 group-hover:animate-float">{tech.logo}</div>
                <div className="font-medium">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 text-center">
          <div className="glass-dark p-12 rounded-3xl max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold font-sora mb-6">
              Ready to <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">Supercharge</span> Your Workflow?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of developers who are already building faster with DevSynth AI.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-neon-blue to-neon-purple px-12 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto neon-glow"
            >
              <Sparkles className="w-5 h-5" />
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold font-sora">DevSynth AI</span>
              </div>
              <p className="text-muted-foreground">
                The ultimate AI-powered productivity suite for modern developers.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>Features</div>
                <div>Modules</div>
                <div>Pricing</div>
                <div>Documentation</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>About</div>
                <div>Blog</div>
                <div>Careers</div>
                <div>Contact</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Github className="w-6 h-6 text-muted-foreground hover:text-white cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 text-muted-foreground hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="w-6 h-6 text-muted-foreground hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 DevSynth AI. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
