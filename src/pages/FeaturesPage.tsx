
import { motion } from "framer-motion";
import { ArrowLeft, Zap, FileText, Code, Database, Download, ArrowRight, CheckCircle, Star, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/motion/PageTransition";
import { FadeInUp, SlideIn, HoverGlow } from "@/components/motion/MotionWrapper";

const FeaturesPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 'stackwizard',
      icon: Zap,
      title: "StackWizard+",
      description: "Generate complete tech stacks and project roadmaps with AI-powered recommendations",
      gradient: "from-neon-coral to-neon-orange",
      benefits: [
        "Complete project architecture planning",
        "Technology stack recommendations", 
        "Timeline and milestone generation",
        "Budget estimation and resource planning"
      ],
      demoFeatures: ["Project Planning", "Tech Stack Analysis", "Timeline Generation", "Resource Estimation"]
    },
    {
      id: 'promptrefiner',
      icon: FileText,
      title: "PromptRefiner",
      description: "Optimize your AI prompts for better results with intelligent suggestions",
      gradient: "from-neon-aqua to-cyan-400",
      benefits: [
        "Intelligent prompt optimization",
        "Context-aware suggestions",
        "Performance metrics tracking",
        "A/B testing capabilities"
      ],
      demoFeatures: ["Prompt Analysis", "Optimization Suggestions", "Performance Metrics", "Export Options"]
    },
    {
      id: 'sqldoctor',
      icon: Database,
      title: "SQLDoctor",
      description: "Analyze, optimize, and debug SQL queries with performance insights",
      gradient: "from-neon-orange to-orange-500",
      benefits: [
        "Query performance analysis",
        "Index recommendations",
        "Security vulnerability detection",
        "Query optimization suggestions"
      ],
      demoFeatures: ["Query Analysis", "Performance Insights", "Security Checks", "Optimization Tips"]
    },
    {
      id: 'codelens',
      icon: Code,
      title: "CodeLens",
      description: "Deep code analysis with security, performance, and quality recommendations",
      gradient: "from-emerald-500 to-teal-600",
      benefits: [
        "Comprehensive code analysis",
        "Security vulnerability scanning",
        "Performance bottleneck detection",
        "Code quality improvement suggestions"
      ],
      demoFeatures: ["Code Analysis", "Security Scan", "Performance Review", "Quality Metrics"]
    },
    {
      id: 'testcasegen',
      icon: Download,
      title: "TestCaseGen",
      description: "Generate comprehensive test cases for your applications automatically",
      gradient: "from-neon-coral to-pink-500",
      benefits: [
        "Automated test case generation",
        "Edge case identification",
        "Multiple testing framework support",
        "Coverage analysis and reporting"
      ],
      demoFeatures: ["Test Generation", "Edge Cases", "Coverage Analysis", "Framework Support"]
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-neon-coral/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-neon-aqua/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 p-6 backdrop-blur-xl bg-black/20 border-b border-white/10">
          <div className="container mx-auto flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-400 hover:text-neon-aqua transition-all duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-gradient-to-r from-neon-coral to-neon-aqua rounded-xl font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-neon-coral/25"
            >
              Try Now
            </button>
          </div>
        </nav>

        <div className="relative z-10 container mx-auto px-6 py-16">
          {/* Hero Section */}
          <FadeInUp>
            <div className="text-center mb-20">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-neon-coral animate-pulse" />
                <h1 className="text-6xl font-bold font-sora bg-gradient-to-r from-neon-coral via-neon-aqua to-neon-purple bg-clip-text text-transparent">
                  Powerful AI Features
                </h1>
                <Sparkles className="w-8 h-8 text-neon-aqua animate-pulse" />
              </div>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Discover the comprehensive suite of AI-powered tools designed to 
                <span className="text-neon-aqua font-semibold"> supercharge your development workflow</span> and 
                <span className="text-neon-coral font-semibold"> accelerate your productivity</span>
              </p>
            </div>
          </FadeInUp>

          {/* Features Grid */}
          <div className="space-y-24">
            {features.map((feature, index) => (
              <SlideIn 
                key={feature.id} 
                delay={index * 0.2} 
                direction={index % 2 === 0 ? 'left' : 'right'}
              >
                <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Feature Content */}
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient}/20 rounded-3xl flex items-center justify-center backdrop-blur-xl border border-white/10`}>
                        <feature.icon className={`w-10 h-10 text-neon-coral`} />
                      </div>
                      <div>
                        <h2 className="text-4xl font-bold text-white font-sora">{feature.title}</h2>
                        <p className="text-gray-400 text-lg">{feature.description}</p>
                      </div>
                    </div>

                    <div className="space-y-6 mb-10">
                      {feature.benefits.map((benefit, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-4 group"
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.15 }}
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-neon-aqua rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-gray-300 text-lg group-hover:text-white transition-colors">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>

                    <HoverGlow>
                      <button
                        onClick={() => navigate('/login')}
                        className={`group px-10 py-5 bg-gradient-to-r ${feature.gradient} rounded-2xl font-semibold text-white overflow-hidden relative text-lg hover:scale-105 transition-all duration-300`}
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          Try {feature.title}
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </button>
                    </HoverGlow>
                  </div>

                  {/* Feature Demo */}
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <motion.div
                      className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 rounded-3xl p-8 border border-white/10 hover:border-neon-aqua/30 transition-all duration-500"
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-6">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="flex gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          </div>
                          <span className="text-sm text-gray-400 bg-black/20 px-3 py-1 rounded-full">
                            {feature.title.toLowerCase()}.ai
                          </span>
                          <Star className="w-4 h-4 text-neon-coral ml-auto animate-pulse" />
                        </div>
                        
                        {feature.demoFeatures.map((demo, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-white/5 to-white/2 border border-white/10 hover:border-neon-aqua/30 transition-all duration-300"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.2 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className={`w-3 h-3 bg-gradient-to-r ${feature.gradient} rounded-full animate-pulse`}></div>
                            <span className="text-gray-300 font-medium">{demo}</span>
                            <div className="ml-auto flex items-center gap-2">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                              <span className="text-xs text-emerald-400">Active</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </SlideIn>
            ))}
          </div>

          {/* CTA Section */}
          <FadeInUp delay={1.0}>
            <div className="text-center mt-24">
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 rounded-3xl p-16 border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-coral/5 via-neon-aqua/5 to-neon-purple/5"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <Sparkles className="w-10 h-10 text-neon-coral animate-pulse" />
                    <h2 className="text-5xl font-bold font-sora bg-gradient-to-r from-neon-coral via-neon-aqua to-neon-purple bg-clip-text text-transparent">
                      Ready to Experience the Future?
                    </h2>
                    <Sparkles className="w-10 h-10 text-neon-aqua animate-pulse" />
                  </div>
                  <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                    Join <span className="text-neon-coral font-bold">thousands of developers</span> who are already building faster with 
                    <span className="text-neon-aqua font-bold"> DevSynth AI</span>
                  </p>
                  <HoverGlow>
                    <button
                      onClick={() => navigate('/login')}
                      className="px-16 py-6 bg-gradient-to-r from-neon-coral to-neon-aqua rounded-2xl text-xl font-bold hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-neon-coral/25 group"
                    >
                      <span className="flex items-center gap-3">
                        Start Building Now
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                      </span>
                    </button>
                  </HoverGlow>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </PageTransition>
  );
};

export default FeaturesPage;
