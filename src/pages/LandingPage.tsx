
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Code2, 
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
  Clock
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
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="relative">
          <motion.div 
            className="w-20 h-20 border-4 border-orange-200 border-t-orange-300 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-orange-200 rounded-full"
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
      accent: "orange-300"
    },
    {
      icon: FileText,
      title: "PromptRefiner",
      description: "Optimize your AI prompts for better results with intelligent suggestions",
      accent: "orange-300"
    },
    {
      icon: Database,
      title: "SQLDoctor",
      description: "Analyze, optimize, and debug SQL queries with performance insights",
      accent: "orange-300"
    },
    {
      icon: Code2,
      title: "CodeLens",
      description: "Deep code analysis with security, performance, and quality recommendations",
      accent: "orange-300"
    },
    {
      icon: Download,
      title: "TestCaseGen",
      description: "Generate comprehensive test cases for your applications automatically",
      accent: "orange-300"
    }
  ];

  const techStack = [
    { name: "React", logo: "⚛️", color: "text-orange-300" },
    { name: "TypeScript", logo: "📘", color: "text-orange-300" },
    { name: "Supabase", logo: "🟢", color: "text-orange-200" },
    { name: "Tailwind", logo: "🎨", color: "text-orange-200" },
    { name: "OpenAI", logo: "🤖", color: "text-orange-300" },
    { name: "Vercel", logo: "▲", color: "text-gray-300" }
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
      <div className="min-h-screen bg-zinc-900 text-white overflow-x-hidden relative">
        {/* Enhanced 3D Background */}
        <FloatingGeometry />
        
        {/* Floating Orb */}
        <FloatingOrb />

        {/* ENHANCED Animated Background with ULTRA VISIBLE Ring Animations */}
        <motion.div 
          className="fixed inset-0 z-0"
          style={{ y: backgroundY }}
        >
          {/* Primary dark background with subtle grid */}
          <div className="absolute inset-0 bg-zinc-900">
            {/* Enhanced grid pattern */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(253, 186, 116, 0.2) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(253, 186, 116, 0.2) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
          </div>
          
          {/* ULTRA BRIGHT floating orbs with maximum glow */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-orange-200/60 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.8, 1],
              opacity: [0.6, 0.8, 0.6],
              x: [0, 150, 0],
              y: [0, 100, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-[44rem] h-[44rem] bg-orange-300/50 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.7, 0.5],
              x: [0, -100, 0],
              y: [0, -120, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          
          {/* MAXIMUM VISIBILITY ring animations with ULTRA thick borders and brightest colors */}
          <motion.div 
            className="absolute top-10 right-20 w-[30rem] h-[30rem] border-[20px] border-orange-300/90 rounded-full"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.6, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-20 left-20 w-[35rem] h-[35rem] border-[18px] border-orange-200/85 rounded-full"
            animate={{ 
              rotate: [360, 0],
              scale: [1.1, 0.7, 1.1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/4 w-80 h-80 border-[16px] border-orange-100/80 rounded-full"
            animate={{ 
              rotate: [0, -360],
              scale: [0.8, 1.5, 0.8]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-1/3 left-1/4 w-96 h-96 border-[18px] border-orange-300/95 rounded-full"
            animate={{ 
              rotate: [180, 540],
              scale: [1, 0.6, 1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute top-20 left-1/2 w-[22rem] h-[22rem] border-[14px] border-orange-200/90 rounded-full"
            animate={{ 
              rotate: [90, 450],
              scale: [0.9, 1.7, 0.9]
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-32 right-1/3 w-[25rem] h-[25rem] border-[20px] border-orange-100/85 rounded-full"
            animate={{ 
              rotate: [270, -90],
              scale: [1.2, 0.7, 1.2]
            }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Additional ultra-bright rings for maximum visibility */}
          <motion.div 
            className="absolute top-1/2 left-10 w-72 h-72 border-[12px] border-orange-300/95 rounded-full"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.8, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-10 w-80 h-80 border-[16px] border-orange-200/90 rounded-full"
            animate={{ 
              rotate: [180, -180],
              scale: [0.9, 1.6, 0.9]
            }}
            transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Navigation */}
        <motion.nav 
          className="fixed top-0 w-full z-50 backdrop-blur-xl bg-zinc-900/95 border-b border-zinc-700"
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
                    className="w-10 h-10 bg-orange-300 rounded-xl flex items-center justify-center"
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(253, 186, 116, 0.3)",
                        "0 0 30px rgba(253, 186, 116, 0.5)",
                        "0 0 20px rgba(253, 186, 116, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="w-5 h-5 text-zinc-900" />
                  </motion.div>
                </div>
                <motion.span 
                  className="text-xl font-bold font-sora text-white"
                  style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.5)" }}
                >
                  OneAI
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
                    className="text-gray-200 hover:text-white transition-all duration-300 relative font-medium"
                    style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.3)" }}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {item.name}
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-300"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={() => navigate('/login')}
                className="relative group px-6 py-2.5 bg-orange-300 text-zinc-900 rounded-xl font-semibold border border-orange-300 hover:bg-orange-200 transition-colors"
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

        {/* Hero Section with ENHANCED text visibility */}
        <section className="relative min-h-screen flex items-center justify-center pt-20">
          <motion.div 
            className="container mx-auto px-6 text-center relative z-10"
            style={{ y: heroY }}
          >
            <div className="max-w-5xl mx-auto">
              {/* Badge */}
              <FadeInUp delay={0.2}>
                <div className="inline-flex items-center gap-2 bg-zinc-800/90 border border-zinc-600 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
                  <Zap className="w-4 h-4 text-orange-300" />
                  <span className="text-sm text-orange-200 font-medium">AI-Powered Developer Suite</span>
                </div>
              </FadeInUp>

              {/* Main Headline with MAXIMUM visibility */}
              <FadeInUp delay={0.4}>
                <h1 className="text-6xl md:text-8xl font-bold font-sora mb-8 leading-tight">
                  <span 
                    className="block text-white drop-shadow-2xl"
                    style={{ 
                      textShadow: "0 0 40px rgba(255, 255, 255, 0.8), 0 0 80px rgba(255, 255, 255, 0.4)"
                    }}
                  >
                    Code Smarter
                  </span>
                  <motion.span 
                    className="block text-orange-300 drop-shadow-2xl"
                    style={{ 
                      textShadow: "0 0 40px rgba(253, 186, 116, 0.9), 0 0 80px rgba(253, 186, 116, 0.5)"
                    }}
                  >
                    Build Faster
                  </motion.span>
                </h1>
              </FadeInUp>
              
              {/* Subheadline with enhanced visibility */}
              <FadeInUp delay={0.6}>
                <p 
                  className="text-xl md:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-lg"
                  style={{ 
                    textShadow: "0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.3)"
                  }}
                >
                  Transform your development workflow with intelligent code analysis, 
                  SQL optimization, and AI-driven productivity tools that feel like magic.
                </p>
              </FadeInUp>

              {/* CTA Buttons */}
              <FadeInUp delay={0.8}>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                  <motion.button
                    onClick={() => navigate('/login')}
                    className="group relative px-10 py-4 bg-orange-300 text-zinc-900 rounded-2xl text-lg font-semibold border border-orange-300 hover:bg-orange-200 transition-colors"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(253, 186, 116, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <Play className="w-5 h-5" />
                      Start Building Now
                    </span>
                  </motion.button>
                  
                  <motion.button 
                    className="group px-10 py-4 border border-zinc-600 text-gray-200 rounded-2xl text-lg font-semibold bg-zinc-800/50 hover:bg-zinc-700/50 flex items-center gap-3 transition-colors backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="w-5 h-5" />
                    View on GitHub
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </FadeInUp>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 relative bg-zinc-800/50">
          <div className="container mx-auto px-6">
            <FadeInUp>
              <div className="text-center mb-20">
                <h2 
                  className="text-5xl font-bold font-sora mb-6 text-white"
                  style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}
                >
                  Powerful Features
                </h2>
                <p 
                  className="text-xl text-gray-200 max-w-3xl mx-auto"
                  style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }}
                >
                  Everything you need to supercharge your development workflow, powered by cutting-edge AI
                </p>
              </div>
            </FadeInUp>

            <div className="grid lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <SlideIn key={index} delay={index * 0.2} direction="up">
                  <FloatingCard className="group relative p-8 rounded-3xl bg-zinc-900/80 border border-zinc-600 hover:border-orange-300/50 transition-all duration-500 shadow-sm hover:shadow-md backdrop-blur-sm">
                    <div className="relative z-10">
                      <motion.div 
                        className="w-16 h-16 bg-zinc-800 border border-zinc-600 rounded-2xl flex items-center justify-center mb-6"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 5
                        }}
                      >
                        <benefit.icon className="w-8 h-8 text-orange-300" />
                      </motion.div>
                      <h3 
                        className="text-2xl font-bold mb-4 text-white"
                        style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.3)" }}
                      >
                        {benefit.title}
                      </h3>
                      <p 
                        className="text-gray-200 leading-relaxed"
                        style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.2)" }}
                      >
                        {benefit.description}
                      </p>
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
                <h2 
                  className="text-5xl font-bold font-sora mb-6 text-white"
                  style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}
                >
                  AI Modules
                </h2>
                <p 
                  className="text-xl text-gray-200"
                  style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }}
                >
                  Each module is designed to work seamlessly together for maximum productivity
                </p>
              </div>
            </FadeInUp>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <SlideIn key={index} delay={index * 0.15} direction={index % 2 === 0 ? 'left' : 'right'}>
                  <FloatingCard className="group relative p-8 rounded-3xl bg-zinc-800/80 border border-zinc-600 hover:border-orange-300/50 transition-all duration-500 shadow-sm hover:shadow-md backdrop-blur-sm">
                    <div className="relative z-10">
                      <motion.div 
                        className="w-14 h-14 bg-zinc-900 border border-zinc-600 rounded-2xl flex items-center justify-center mb-6"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: -5
                        }}
                      >
                        <feature.icon className="w-7 h-7 text-orange-300" />
                      </motion.div>
                      <h3 
                        className="text-xl font-bold mb-4 text-white"
                        style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.3)" }}
                      >
                        {feature.title}
                      </h3>
                      <p 
                        className="text-gray-200 text-sm leading-relaxed"
                        style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.2)" }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </FloatingCard>
                </SlideIn>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="techstack" className="py-32 relative bg-zinc-800/50">
          <div className="container mx-auto px-6">
            <FadeInUp>
              <div className="text-center mb-20">
                <h2 
                  className="text-5xl font-bold font-sora mb-6 text-white"
                  style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}
                >
                  Modern Tech Stack
                </h2>
                <p 
                  className="text-xl text-gray-200"
                  style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }}
                >
                  Built with the latest technologies for optimal performance and developer experience
                </p>
              </div>
            </FadeInUp>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {techStack.map((tech, index) => (
                <ScaleIn key={index} delay={index * 0.1}>
                  <motion.div
                    className="group relative p-8 rounded-3xl bg-zinc-900/80 border border-zinc-600 hover:border-orange-300 text-center transition-all duration-500 shadow-sm hover:shadow-md backdrop-blur-sm"
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
                    <div 
                      className={`font-semibold ${tech.color}`}
                      style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.2)" }}
                    >
                      {tech.name}
                    </div>
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
                  <h2 
                    className="text-5xl font-bold font-sora mb-8 text-white"
                    style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}
                  >
                    What is OneAI?
                  </h2>
                  <p 
                    className="text-xl text-gray-200 mb-8 leading-relaxed"
                    style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }}
                  >
                    OneAI is the ultimate productivity suite for modern developers. 
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
                          className="w-6 h-6 bg-orange-300 rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.2 }}
                        >
                          <CheckCircle className="w-4 h-4 text-zinc-900" />
                        </motion.div>
                        <span 
                          className="text-gray-200"
                          style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.2)" }}
                        >
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </SlideIn>
              
              <SlideIn direction="right">
                <div className="relative">
                  <motion.div 
                    className="relative p-8 rounded-3xl bg-zinc-800/80 border border-zinc-600 shadow-lg backdrop-blur-sm"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 25px 50px rgba(253, 186, 116, 0.1)"
                    }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span 
                          className="text-sm text-gray-300 ml-4"
                          style={{ textShadow: "0 0 5px rgba(255, 255, 255, 0.2)" }}
                        >
                          devsynth-ai.terminal
                        </span>
                      </div>
                      <div className="font-mono text-sm space-y-3 text-left">
                        <motion.div 
                          className="text-gray-200"
                          style={{ textShadow: "0 0 5px rgba(255, 255, 255, 0.2)" }}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          $ devsynth analyze --query="SELECT * FROM users"
                        </motion.div>
                        <motion.div 
                          className="text-gray-300"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          🔍 Analyzing SQL query...
                        </motion.div>
                        <motion.div 
                          className="text-orange-300"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          ✅ Performance: 85/100
                        </motion.div>
                        <motion.div 
                          className="text-orange-200"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.7 }}
                        >
                          ⚠️  Recommendation: Avoid SELECT *
                        </motion.div>
                        <motion.div 
                          className="text-orange-300"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.9 }}
                        >
                          🚀 Optimized query generated
                        </motion.div>
                        <motion.div 
                          className="text-orange-200"
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
        <section className="py-32 relative bg-zinc-800/50">
          <div className="container mx-auto px-6 text-center">
            <FadeInUp>
              <motion.div 
                className="relative max-w-4xl mx-auto p-16 rounded-3xl bg-zinc-900/80 border border-zinc-600 shadow-lg backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
                }}
              >
                <h2 
                  className="text-5xl font-bold font-sora mb-8 text-white"
                  style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}
                >
                  Ready to Transform Your Workflow?
                </h2>
                <p 
                  className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto"
                  style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }}
                >
                  Join thousands of developers who are already building faster, smarter, and more efficiently with OneAI.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <motion.button
                    onClick={() => navigate('/login')}
                    className="group relative px-12 py-4 bg-orange-300 text-zinc-900 rounded-2xl text-lg font-semibold border border-orange-300 hover:bg-orange-200 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <Zap className="w-5 h-5" />
                      Get Started Free
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>

                  <motion.div 
                    className="flex items-center gap-2 text-gray-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Users className="w-5 h-5" />
                    <span style={{ textShadow: "0 0 5px rgba(255, 255, 255, 0.2)" }}>10,000+ developers</span>
                  </motion.div>
                </div>
              </motion.div>
            </FadeInUp>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-700 py-16 relative bg-zinc-900/80">
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
                        className="w-10 h-10 bg-orange-300 rounded-xl flex items-center justify-center"
                        animate={{ 
                          boxShadow: [
                            "0 0 20px rgba(253, 186, 116, 0.2)",
                            "0 0 30px rgba(253, 186, 116, 0.3)",
                            "0 0 20px rgba(253, 186, 116, 0.2)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Zap className="w-5 h-5 text-zinc-900" />
                      </motion.div>
                    </div>
                    <span 
                      className="text-xl font-bold font-sora text-white"
                      style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.3)" }}
                    >
                      OneAI
                    </span>
                  </motion.div>
                  <p 
                    className="text-gray-300 leading-relaxed"
                    style={{ textShadow: "0 0 5px rgba(255, 255, 255, 0.2)" }}
                  >
                    The ultimate AI-powered productivity suite for modern developers. 
                    Build faster, code smarter.
                  </p>
                </div>
              </FadeInUp>
              
              <SlideIn delay={0.1} direction="up">
                <div>
                  <h4 
                    className="font-semibold text-white mb-6"
                    style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.3)" }}
                  >
                    Product
                  </h4>
                  <div className="space-y-4">
                    {[
                      { name: "Features", path: "/features" },
                      { name: "Pricing", path: "/pricing" },
                      { name: "About", path: "/about" }
                    ].map((link, i) => (
                      <motion.button
                        key={link.name}
                        onClick={() => navigate(link.path)}
                        className="block text-gray-300 hover:text-white transition-colors relative text-left"
                        style={{ textShadow: "0 0 5px rgba(255, 255, 255, 0.2)" }}
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
                  <h4 
                    className="font-semibold text-white mb-6"
                    style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.3)" }}
                  >
                    Support
                  </h4>
                  <div className="space-y-4">
                    {[
                      { name: "Contact", path: "/contact" },
                      { name: "Terms of Service", path: "/terms" },
                      { name: "Privacy Policy", path: "/privacy" }
                    ].map((link, i) => (
                      <motion.button
                        key={link.name}
                        onClick={() => navigate(link.path)}
                        className="block text-gray-300 hover:text-white transition-colors relative text-left"
                        style={{ textShadow: "0 0 5px rgba(255, 255, 255, 0.2)" }}
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
                  <h4 
                    className="font-semibold text-white mb-6"
                    style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.3)" }}
                  >
                    Connect
                  </h4>
                  <div className="flex space-x-4">
                    {[Github, Twitter, Linkedin].map((Icon, i) => (
                      <motion.a
                        key={i}
                        href="#"
                        className="p-3 rounded-xl bg-zinc-800/80 border border-zinc-600 hover:bg-zinc-700/80 transition-all duration-300 backdrop-blur-sm"
                        whileHover={{ 
                          scale: 1.1,
                          y: -2
                        }}
                      >
                        <Icon className="w-5 h-5 text-gray-300 hover:text-white transition-colors" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </SlideIn>
            </div>
            
            <FadeInUp delay={0.5}>
              <div className="border-t border-zinc-700 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p 
                  className="text-gray-400"
                  style={{ textShadow: "0 0 5px rgba(255, 255, 255, 0.2)" }}
                >
                  &copy; 2024 OneAI. All rights reserved.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <button 
                    onClick={() => navigate('/privacy')}
                    className="text-gray-400 hover:text-white transition-colors"
                    style={{ textShadow: "0 0 5px rgba(255, 255, 255, 0.2)" }}
                  >
                    Privacy Policy
                  </button>
                  <button 
                    onClick={() => navigate('/terms')}
                    className="text-gray-400 hover:text-white transition-colors"
                    style={{ textShadow: "0 0 5px rgba(255, 255, 255, 0.2)" }}
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
