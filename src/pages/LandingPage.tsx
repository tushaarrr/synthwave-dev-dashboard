import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { motion, useScroll, useTransform } from "framer-motion";
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
  Download,
  Play,
  Users,
  Clock,
  Star
} from "lucide-react";
import FloatingGeometry from "@/components/3D/FloatingGeometry";
import FloatingOrb from "@/components/3D/FloatingOrb";
import { FadeInUp, SlideIn, ScaleIn, HoverGlow, FloatingCard } from "@/components/motion/MotionWrapper";
import PageTransition from "@/components/motion/PageTransition";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="relative">
          <motion.div 
            className="w-20 h-20 border-4 border-orange-200 border-t-orange-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-orange-300 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
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
      accent: "orange-400"
    },
    {
      icon: FileText,
      title: "PromptRefiner",
      description: "Optimize your AI prompts for better results with intelligent suggestions",
      accent: "orange-400"
    },
    {
      icon: Database,
      title: "SQLDoctor",
      description: "Analyze, optimize, and debug SQL queries with performance insights",
      accent: "orange-400"
    },
    {
      icon: Code2,
      title: "CodeLens",
      description: "Deep code analysis with security, performance, and quality recommendations",
      accent: "orange-400"
    },
    {
      icon: Download,
      title: "TestCaseGen",
      description: "Generate comprehensive test cases for your applications automatically",
      accent: "orange-400"
    }
  ];

  const techStack = [
    { name: "React", logo: "⚛️", color: "text-orange-500" },
    { name: "TypeScript", logo: "📘", color: "text-orange-500" },
    { name: "Supabase", logo: "🟢", color: "text-orange-400" },
    { name: "Tailwind", logo: "🎨", color: "text-orange-400" },
    { name: "OpenAI", logo: "🤖", color: "text-orange-500" },
    { name: "Vercel", logo: "▲", color: "text-gray-700" }
  ];

  const benefits = [
    {
      icon: Rocket,
      title: "Boost Productivity",
      description: "Accelerate development with AI-powered insights"
    },
    {
      icon: Layers,
      title: "Accelerate Roadmaps",
      description: "Generate comprehensive project plans instantly"
    },
    {
      icon: Code2,
      title: "Explain Code Instantly",
      description: "Understand complex code with natural language"
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden relative">
        {/* 3D Background */}
        <FloatingGeometry />
        
        {/* Floating Orb */}
        <FloatingOrb />

        {/* Animated Background */}
        <motion.div 
          className="fixed inset-0 z-0"
          style={{ y: backgroundY }}
        >
          {/* Primary gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50"></div>
          
          {/* Animated grid */}
          <motion.div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(251, 146, 60, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(251, 146, 60, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
            animate={{
              backgroundPosition: ['0px 0px', '60px 60px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Floating orbs */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </motion.div>

        {/* Navigation */}
        <motion.nav 
          className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <motion.div 
                    className="w-10 h-10 bg-orange-400 rounded-xl flex items-center justify-center"
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(251, 146, 60, 0.3)",
                        "0 0 30px rgba(251, 146, 60, 0.5)",
                        "0 0 20px rgba(251, 146, 60, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
                <motion.span 
                  className="text-xl font-bold font-sora text-gray-800"
                >
                  DevSynth AI
                </motion.span>
              </motion.div>
              
              <div className="hidden md:flex items-center space-x-8">
                {[
                  { name: 'About', path: '/about' },
                  { name: 'Features', path: '/features' },
                  { name: 'Pricing', path: '/pricing' },
                  { name: 'Contact', path: '/contact' }
                ].map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className="text-gray-600 hover:text-gray-900 transition-all duration-300 relative"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {item.name}
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={() => navigate('/login')}
                className="relative group px-6 py-2.5 bg-orange-400 text-white rounded-xl font-semibold border border-orange-400 hover:bg-orange-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20">
          <motion.div 
            className="container mx-auto px-6 text-center relative z-10"
            style={{ y: heroY }}
          >
            <div className="max-w-5xl mx-auto">
              {/* Badge */}
              <FadeInUp delay={0.2}>
                <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 rounded-full px-4 py-2 mb-8">
                  <Star className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-orange-600">AI-Powered Developer Suite</span>
                </div>
              </FadeInUp>

              {/* Main Headline */}
              <FadeInUp delay={0.4}>
                <h1 className="text-6xl md:text-8xl font-bold font-sora mb-8 leading-tight">
                  <span className="block text-gray-900">Code Smarter</span>
                  <motion.span 
                    className="block text-orange-500"
                  >
                    Build Faster
                  </motion.span>
                </h1>
              </FadeInUp>
              
              {/* Subheadline */}
              <FadeInUp delay={0.6}>
                <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Transform your development workflow with intelligent code analysis, 
                  SQL optimization, and AI-driven productivity tools that feel like magic.
                </p>
              </FadeInUp>

              {/* CTA Buttons */}
              <FadeInUp delay={0.8}>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                  <motion.button
                    onClick={() => navigate('/login')}
                    className="group relative px-10 py-4 bg-orange-400 text-white rounded-2xl text-lg font-semibold border border-orange-400 hover:bg-orange-500 transition-colors"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(251, 146, 60, 0.2)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <Play className="w-5 h-5" />
                      Start Building Now
                    </span>
                  </motion.button>
                  
                  <motion.button 
                    className="group px-10 py-4 border border-gray-300 text-gray-700 rounded-2xl text-lg font-semibold bg-white hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="w-5 h-5" />
                    View on GitHub
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </FadeInUp>

              {/* 3D Visualization Area */}
              <FadeInUp delay={1.0}>
                <div className="relative mx-auto max-w-4xl">
                  <div className="relative h-96 rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50"></div>
                    
                    {/* Animated geometric shapes */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid grid-cols-5 gap-4 p-8">
                        {[...Array(15)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`w-16 h-16 rounded-2xl ${
                              i % 3 === 0 ? 'bg-orange-100 border border-orange-200' :
                              i % 3 === 1 ? 'bg-gray-100 border border-gray-200' :
                              'bg-orange-50 border border-orange-100'
                            }`}
                            animate={{ 
                              y: [0, -20, 0],
                              rotateY: [0, 180, 360]
                            }}
                            transition={{ 
                              duration: 3 + (i % 3),
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                            whileHover={{ scale: 1.1 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 relative bg-gray-50">
          <div className="container mx-auto px-6">
            <FadeInUp>
              <div className="text-center mb-20">
                <h2 className="text-5xl font-bold font-sora mb-6 text-gray-900">
                  Powerful Features
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Everything you need to supercharge your development workflow, powered by cutting-edge AI
                </p>
              </div>
            </FadeInUp>

            <div className="grid lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <SlideIn key={index} delay={index * 0.2} direction="up">
                  <FloatingCard className="group relative p-8 rounded-3xl bg-white border border-gray-200 hover:border-orange-300 transition-all duration-500 shadow-sm hover:shadow-md">
                    <div className="relative z-10">
                      <motion.div 
                        className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 5
                        }}
                      >
                        <benefit.icon className="w-8 h-8 text-orange-500" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">{benefit.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </FloatingCard>
                </SlideIn>
              ))}
            </div>
          </div>
        </section>

        {/* Modules Showcase */}
        <section id="modules" className="py-32 relative">
          <div className="container mx-auto px-6">
            <FadeInUp>
              <div className="text-center mb-20">
                <h2 className="text-5xl font-bold font-sora mb-6 text-gray-900">
                  AI Modules
                </h2>
                <p className="text-xl text-gray-600">
                  Each module is designed to work seamlessly together for maximum productivity
                </p>
              </div>
            </FadeInUp>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <SlideIn key={index} delay={index * 0.15} direction={index % 2 === 0 ? 'left' : 'right'}>
                  <FloatingCard className="group relative p-8 rounded-3xl bg-white border border-gray-200 hover:border-orange-300 transition-all duration-500 shadow-sm hover:shadow-md">
                    <div className="relative z-10">
                      <motion.div 
                        className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: -5
                        }}
                      >
                        <feature.icon className="w-7 h-7 text-orange-500" />
                      </motion.div>
                      <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </FloatingCard>
                </SlideIn>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="techstack" className="py-32 relative bg-gray-50">
          <div className="container mx-auto px-6">
            <FadeInUp>
              <div className="text-center mb-20">
                <h2 className="text-5xl font-bold font-sora mb-6 text-gray-900">
                  Modern Tech Stack
                </h2>
                <p className="text-xl text-gray-600">
                  Built with the latest technologies for optimal performance and developer experience
                </p>
              </div>
            </FadeInUp>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {techStack.map((tech, index) => (
                <ScaleIn key={index} delay={index * 0.1}>
                  <motion.div
                    className="group relative p-8 rounded-3xl bg-white border border-gray-200 hover:border-orange-300 text-center transition-all duration-500 shadow-sm hover:shadow-md"
                    whileHover={{ 
                      scale: 1.1,
                      y: -10
                    }}
                  >
                    <motion.div 
                      className="text-5xl mb-4"
                      animate={{ 
                        rotateY: [0, 180, 360] 
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    >
                      {tech.logo}
                    </motion.div>
                    <div className={`font-semibold ${tech.color}`}>{tech.name}</div>
                  </motion.div>
                </ScaleIn>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <SlideIn direction="left">
                <div>
                  <h2 className="text-5xl font-bold font-sora mb-8 text-gray-900">
                    What is DevSynth AI?
                  </h2>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    DevSynth AI is the ultimate productivity suite for modern developers. 
                    Our platform combines cutting-edge artificial intelligence with intuitive design 
                    to help you write better code, optimize databases, and accelerate your development workflow.
                  </p>
                  <div className="space-y-6">
                    {[
                      "AI-powered code analysis and optimization",
                      "Intelligent SQL query debugging and performance tuning",
                      "Automated test case generation with edge case coverage",
                      "Project planning and tech stack recommendations"
                    ].map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <motion.div 
                          className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.2 }}
                        >
                          <CheckCircle className="w-4 h-4 text-white" />
                        </motion.div>
                        <span className="text-gray-700">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </SlideIn>
              
              <SlideIn direction="right">
                <div className="relative">
                  <motion.div 
                    className="relative p-8 rounded-3xl bg-white border border-gray-200 shadow-lg"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 25px 50px rgba(251, 146, 60, 0.1)"
                    }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-500 ml-4">devsynth-ai.terminal</span>
                      </div>
                      <div className="font-mono text-sm space-y-3 text-left">
                        <motion.div 
                          className="text-gray-700"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          $ devsynth analyze --query="SELECT * FROM users"
                        </motion.div>
                        <motion.div 
                          className="text-gray-500"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          🔍 Analyzing SQL query...
                        </motion.div>
                        <motion.div 
                          className="text-orange-500"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          ✅ Performance: 85/100
                        </motion.div>
                        <motion.div 
                          className="text-orange-400"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.7 }}
                        >
                          ⚠️  Recommendation: Avoid SELECT *
                        </motion.div>
                        <motion.div 
                          className="text-orange-500"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.9 }}
                        >
                          🚀 Optimized query generated
                        </motion.div>
                        <motion.div 
                          className="text-orange-400"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 1.1 }}
                        >
                          💡 Suggesting composite index on (user_id, created_at)
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </SlideIn>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 relative bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <FadeInUp>
              <motion.div 
                className="relative max-w-4xl mx-auto p-16 rounded-3xl bg-white border border-orange-200 shadow-lg"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(251, 146, 60, 0.1)"
                }}
              >
                <h2 className="text-5xl font-bold font-sora mb-8 text-gray-900">
                  Ready to Transform Your Workflow?
                </h2>
                <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                  Join thousands of developers who are already building faster, smarter, and more efficiently with DevSynth AI.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <motion.button
                    onClick={() => navigate('/login')}
                    className="group relative px-12 py-4 bg-orange-400 text-white rounded-2xl text-lg font-semibold border border-orange-400 hover:bg-orange-500 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <Sparkles className="w-5 h-5" />
                      Get Started Free
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>

                  <motion.div 
                    className="flex items-center gap-2 text-gray-500"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Users className="w-5 h-5" />
                    <span>10,000+ developers</span>
                  </motion.div>
                </div>
              </motion.div>
            </FadeInUp>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-16 relative bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <FadeInUp>
                <div>
                  <motion.div 
                    className="flex items-center space-x-3 mb-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="relative">
                      <motion.div 
                        className="w-10 h-10 bg-orange-400 rounded-xl flex items-center justify-center"
                        animate={{ 
                          boxShadow: [
                            "0 0 20px rgba(251, 146, 60, 0.2)",
                            "0 0 30px rgba(251, 146, 60, 0.4)",
                            "0 0 20px rgba(251, 146, 60, 0.2)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>
                    <span className="text-xl font-bold font-sora text-gray-800">
                      DevSynth AI
                    </span>
                  </motion.div>
                  <p className="text-gray-600 leading-relaxed">
                    The ultimate AI-powered productivity suite for modern developers. 
                    Build faster, code smarter.
                  </p>
                </div>
              </FadeInUp>
              
              <SlideIn delay={0.1} direction="up">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-6">Product</h4>
                  <div className="space-y-4">
                    {[
                      { name: "Features", path: "/features" },
                      { name: "Pricing", path: "/pricing" },
                      { name: "About", path: "/about" }
                    ].map((link, i) => (
                      <motion.button
                        key={link.name}
                        onClick={() => navigate(link.path)}
                        className="block text-gray-600 hover:text-gray-900 transition-colors relative text-left"
                        whileHover={{ x: 5 }}
                      >
                        {link.name}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </SlideIn>

              <SlideIn delay={0.2} direction="up">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-6">Support</h4>
                  <div className="space-y-4">
                    {[
                      { name: "Contact", path: "/contact" },
                      { name: "Terms of Service", path: "/terms" },
                      { name: "Privacy Policy", path: "/privacy" }
                    ].map((link, i) => (
                      <motion.button
                        key={link.name}
                        onClick={() => navigate(link.path)}
                        className="block text-gray-600 hover:text-gray-900 transition-colors relative text-left"
                        whileHover={{ x: 5 }}
                      >
                        {link.name}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </SlideIn>

              <SlideIn delay={0.3} direction="up">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-6">Connect</h4>
                  <div className="flex space-x-4">
                    {[Github, Twitter, Linkedin].map((Icon, i) => (
                      <motion.a
                        key={i}
                        href="#"
                        className="p-3 rounded-xl bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-all duration-300"
                        whileHover={{ 
                          scale: 1.1,
                          y: -2
                        }}
                      >
                        <Icon className="w-5 h-5 text-gray-600 hover:text-gray-800 transition-colors" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </SlideIn>
            </div>
            
            <FadeInUp delay={0.5}>
              <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-600">&copy; 2024 DevSynth AI. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <button 
                    onClick={() => navigate('/privacy')}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Privacy Policy
                  </button>
                  <button 
                    onClick={() => navigate('/terms')}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Terms of Service
                  </button>
                </div>
              </div>
            </FadeInUp>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default LandingPage;
