
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <motion.div 
            className="w-20 h-20 border-4 border-violet-500/30 border-t-violet-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-blue-400 rounded-full"
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
      gradient: "from-violet-500 to-purple-600",
      accent: "violet"
    },
    {
      icon: FileText,
      title: "PromptRefiner",
      description: "Optimize your AI prompts for better results with intelligent suggestions",
      gradient: "from-blue-500 to-cyan-600",
      accent: "blue"
    },
    {
      icon: Database,
      title: "SQLDoctor",
      description: "Analyze, optimize, and debug SQL queries with performance insights",
      gradient: "from-orange-500 to-red-500",
      accent: "orange"
    },
    {
      icon: Code2,
      title: "CodeLens",
      description: "Deep code analysis with security, performance, and quality recommendations",
      gradient: "from-emerald-500 to-teal-600",
      accent: "emerald"
    },
    {
      icon: Download,
      title: "TestCaseGen",
      description: "Generate comprehensive test cases for your applications automatically",
      gradient: "from-pink-500 to-rose-600",
      accent: "pink"
    }
  ];

  const techStack = [
    { name: "React", logo: "⚛️", color: "text-cyan-400" },
    { name: "TypeScript", logo: "📘", color: "text-blue-400" },
    { name: "Supabase", logo: "🟢", color: "text-emerald-400" },
    { name: "Tailwind", logo: "🎨", color: "text-teal-400" },
    { name: "OpenAI", logo: "🤖", color: "text-violet-400" },
    { name: "Vercel", logo: "▲", color: "text-white" }
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
      <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
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
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-black to-blue-950/20"></div>
          
          {/* Animated grid */}
          <motion.div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
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
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </motion.div>

        {/* Navigation */}
        <motion.nav 
          className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/20 border-b border-white/10"
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
                    className="w-10 h-10 bg-gradient-to-r from-violet-500 to-blue-500 rounded-xl flex items-center justify-center"
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(139, 92, 246, 0.5)",
                        "0 0 40px rgba(139, 92, 246, 0.8)",
                        "0 0 20px rgba(139, 92, 246, 0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
                <motion.span 
                  className="text-xl font-bold font-sora bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ['0%', '100%', '0%'] 
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  DevSynth AI
                </motion.span>
              </motion.div>
              
              <div className="hidden md:flex items-center space-x-8">
                {['Features', 'Modules', 'Tech Stack', 'About'].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '')}`}
                    className="text-gray-400 hover:text-white transition-all duration-300 relative"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {item}
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-400 to-blue-400"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </div>

              <motion.button
                onClick={() => navigate('/login')}
                className="relative group px-6 py-2.5 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl font-semibold overflow-hidden"
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
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 opacity-0"
                  whileHover={{ opacity: 1 }}
                />
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
                <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
                  <Star className="w-4 h-4 text-violet-400" />
                  <span className="text-sm text-violet-300">AI-Powered Developer Suite</span>
                </div>
              </FadeInUp>

              {/* Main Headline */}
              <FadeInUp delay={0.4}>
                <h1 className="text-6xl md:text-8xl font-bold font-sora mb-8 leading-tight">
                  <span className="block">Code Smarter</span>
                  <motion.span 
                    className="block bg-gradient-to-r from-violet-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                    animate={{ 
                      backgroundPosition: ['0%', '100%', '0%'] 
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Build Faster
                  </motion.span>
                </h1>
              </FadeInUp>
              
              {/* Subheadline */}
              <FadeInUp delay={0.6}>
                <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Transform your development workflow with intelligent code analysis, 
                  SQL optimization, and AI-driven productivity tools that feel like magic.
                </p>
              </FadeInUp>

              {/* CTA Buttons */}
              <FadeInUp delay={0.8}>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                  <HoverGlow>
                    <motion.button
                      onClick={() => navigate('/login')}
                      className="group relative px-10 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 rounded-2xl text-lg font-semibold overflow-hidden"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <Play className="w-5 h-5" />
                        Start Building Now
                      </span>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 opacity-0"
                        whileHover={{ opacity: 1 }}
                      />
                    </motion.button>
                  </HoverGlow>
                  
                  <HoverGlow>
                    <motion.button 
                      className="group px-10 py-4 border border-white/20 rounded-2xl text-lg font-semibold backdrop-blur-sm hover:bg-white/5 flex items-center gap-3"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github className="w-5 h-5" />
                      View on GitHub
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </HoverGlow>
                </div>
              </FadeInUp>

              {/* 3D Visualization Area */}
              <FadeInUp delay={1.0}>
                <div className="relative mx-auto max-w-4xl">
                  <div className="relative h-96 rounded-3xl overflow-hidden backdrop-blur-sm border border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-blue-500/10"></div>
                    
                    {/* Animated geometric shapes */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid grid-cols-5 gap-4 p-8">
                        {[...Array(15)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                              i % 3 === 0 ? 'from-violet-500/20 to-purple-600/20' :
                              i % 3 === 1 ? 'from-blue-500/20 to-cyan-600/20' :
                              'from-emerald-500/20 to-teal-600/20'
                            } backdrop-blur-sm border border-white/10`}
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
        <section id="features" className="py-32 relative">
          <div className="container mx-auto px-6">
            <FadeInUp>
              <div className="text-center mb-20">
                <h2 className="text-5xl font-bold font-sora mb-6 bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  Powerful Features
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Everything you need to supercharge your development workflow, powered by cutting-edge AI
                </p>
              </div>
            </FadeInUp>

            <div className="grid lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <SlideIn key={index} delay={index * 0.2} direction="up">
                  <FloatingCard className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-violet-500/30 transition-all duration-500">
                    <div className="relative z-10">
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-br from-violet-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-6"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 5
                        }}
                      >
                        <benefit.icon className="w-8 h-8 text-violet-400" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-4 text-white">{benefit.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                    </div>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-blue-500/5 rounded-3xl opacity-0"
                      whileHover={{ opacity: 1 }}
                    />
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
                <h2 className="text-5xl font-bold font-sora mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  AI Modules
                </h2>
                <p className="text-xl text-gray-400">
                  Each module is designed to work seamlessly together for maximum productivity
                </p>
              </div>
            </FadeInUp>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <SlideIn key={index} delay={index * 0.15} direction={index % 2 === 0 ? 'left' : 'right'}>
                  <FloatingCard className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500">
                    <div className="relative z-10">
                      <motion.div 
                        className={`w-14 h-14 bg-gradient-to-br ${feature.gradient}/20 rounded-2xl flex items-center justify-center mb-6`}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: -5
                        }}
                      >
                        <feature.icon className={`w-7 h-7 text-${feature.accent}-400`} />
                      </motion.div>
                      <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}/5 rounded-3xl opacity-0`}
                      whileHover={{ opacity: 1 }}
                    />
                  </FloatingCard>
                </SlideIn>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="techstack" className="py-32 relative">
          <div className="container mx-auto px-6">
            <FadeInUp>
              <div className="text-center mb-20">
                <h2 className="text-5xl font-bold font-sora mb-6 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  Modern Tech Stack
                </h2>
                <p className="text-xl text-gray-400">
                  Built with the latest technologies for optimal performance and developer experience
                </p>
              </div>
            </FadeInUp>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {techStack.map((tech, index) => (
                <ScaleIn key={index} delay={index * 0.1}>
                  <motion.div
                    className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-white/20 text-center transition-all duration-500"
                    whileHover={{ 
                      scale: 1.1,
                      y: -10,
                      boxShadow: "0 20px 40px rgba(139, 92, 246, 0.2)"
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
                  <h2 className="text-5xl font-bold font-sora mb-8 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    What is DevSynth AI?
                  </h2>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
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
                          className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.2 }}
                        >
                          <CheckCircle className="w-4 h-4 text-white" />
                        </motion.div>
                        <span className="text-gray-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </SlideIn>
              
              <SlideIn direction="right">
                <div className="relative">
                  <motion.div 
                    className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 25px 50px rgba(139, 92, 246, 0.15)"
                    }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-400 ml-4">devsynth-ai.terminal</span>
                      </div>
                      <div className="font-mono text-sm space-y-3 text-left">
                        <motion.div 
                          className="text-emerald-400"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          $ devsynth analyze --query="SELECT * FROM users"
                        </motion.div>
                        <motion.div 
                          className="text-gray-400"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          🔍 Analyzing SQL query...
                        </motion.div>
                        <motion.div 
                          className="text-blue-400"
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
                          className="text-violet-400"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.9 }}
                        >
                          🚀 Optimized query generated
                        </motion.div>
                        <motion.div 
                          className="text-cyan-400"
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
        <section className="py-32 relative">
          <div className="container mx-auto px-6 text-center">
            <FadeInUp>
              <motion.div 
                className="relative max-w-4xl mx-auto p-16 rounded-3xl bg-gradient-to-br from-violet-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/20"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(139, 92, 246, 0.2)"
                }}
              >
                <h2 className="text-5xl font-bold font-sora mb-8 bg-gradient-to-r from-violet-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Ready to Transform Your Workflow?
                </h2>
                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                  Join thousands of developers who are already building faster, smarter, and more efficiently with DevSynth AI.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <HoverGlow>
                    <motion.button
                      onClick={() => navigate('/login')}
                      className="group relative px-12 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 rounded-2xl text-lg font-semibold overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <Sparkles className="w-5 h-5" />
                        Get Started Free
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 opacity-0"
                        whileHover={{ opacity: 1 }}
                      />
                    </motion.button>
                  </HoverGlow>

                  <motion.div 
                    className="flex items-center gap-2 text-gray-400"
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
        <footer className="border-t border-white/10 py-16 relative">
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
                        className="w-10 h-10 bg-gradient-to-r from-violet-500 to-blue-500 rounded-xl flex items-center justify-center"
                        animate={{ 
                          boxShadow: [
                            "0 0 20px rgba(139, 92, 246, 0.3)",
                            "0 0 40px rgba(139, 92, 246, 0.6)",
                            "0 0 20px rgba(139, 92, 246, 0.3)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>
                    <span className="text-xl font-bold font-sora bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                      DevSynth AI
                    </span>
                  </motion.div>
                  <p className="text-gray-400 leading-relaxed">
                    The ultimate AI-powered productivity suite for modern developers. 
                    Build faster, code smarter.
                  </p>
                </div>
              </FadeInUp>
              
              {[
                {
                  title: "Product",
                  links: ["Features", "Modules", "Pricing", "Documentation"]
                },
                {
                  title: "Company", 
                  links: ["About", "Blog", "Careers", "Contact"]
                },
                {
                  title: "Connect",
                  links: []
                }
              ].map((section, index) => (
                <SlideIn key={section.title} delay={index * 0.1} direction="up">
                  <div>
                    <h4 className="font-semibold text-white mb-6">{section.title}</h4>
                    {section.title === "Connect" ? (
                      <div className="flex space-x-4">
                        {[Github, Twitter, Linkedin].map((Icon, i) => (
                          <motion.a
                            key={i}
                            href="#"
                            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                            whileHover={{ 
                              scale: 1.1,
                              y: -2,
                              boxShadow: "0 10px 20px rgba(139, 92, 246, 0.2)"
                            }}
                          >
                            <Icon className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                          </motion.a>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {section.links.map((link, i) => (
                          <motion.a
                            key={link}
                            href="#"
                            className="block text-gray-400 hover:text-white transition-colors relative"
                            whileHover={{ x: 5 }}
                          >
                            {link}
                          </motion.a>
                        ))}
                      </div>
                    )}
                  </div>
                </SlideIn>
              ))}
            </div>
            
            <FadeInUp delay={0.5}>
              <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400">&copy; 2024 DevSynth AI. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
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
