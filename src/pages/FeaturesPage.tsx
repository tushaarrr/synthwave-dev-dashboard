
import { motion } from "framer-motion";
import { ArrowLeft, Zap, FileText, Code, Database, Download, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
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
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background - matching landing page */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-mesh opacity-30"></div>
          <div className="absolute top-20 left-10 w-96 h-96 bg-neon-aqua/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-coral/20 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-3xl animate-pulse-glow"></div>
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
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold font-sora bg-gradient-to-r from-neon-coral to-neon-aqua bg-clip-text text-transparent">
                DevSynth
              </span>
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-gradient-to-r from-neon-coral to-neon-aqua rounded-xl text-sm font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-neon-coral/25"
              >
                Try Now
              </button>
            </div>
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
                      <div className="w-16 h-16 bg-gradient-to-br from-neon-coral/20 to-neon-aqua/20 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/10">
                        <feature.icon className="w-8 h-8 text-neon-coral" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white font-sora">{feature.title}</h2>
                        <p className="text-gray-400">{feature.description}</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      {feature.benefits.map((benefit, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-3 group"
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.15 }}
                        >
                          <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-neon-aqua rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-300 group-hover:text-white transition-colors">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>

                    <HoverGlow>
                      <button
                        onClick={() => navigate('/login')}
                        className="group px-6 py-3 bg-gradient-to-r from-neon-coral to-neon-aqua rounded-xl font-semibold text-white text-sm hover:scale-105 transition-all duration-300"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Try {feature.title}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </button>
                    </HoverGlow>
                  </div>

                  {/* Feature Demo */}
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <motion.div
                      className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 rounded-2xl p-6 border border-white/10 hover:border-neon-aqua/30 transition-all duration-500"
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="flex gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                          <span className="text-sm text-gray-400 bg-black/20 px-3 py-1 rounded-full">
                            {feature.title.toLowerCase()}.ai
                          </span>
                        </div>
                        
                        {feature.demoFeatures.map((demo, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-white/5 to-white/2 border border-white/10 hover:border-neon-aqua/30 transition-all duration-300"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.2 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-neon-coral to-neon-aqua rounded-full"></div>
                            <span className="text-gray-300 font-medium">{demo}</span>
                            <div className="ml-auto flex items-center gap-2">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
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
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 rounded-3xl p-12 border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-coral/5 via-neon-aqua/5 to-neon-purple/5"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <Sparkles className="w-8 h-8 text-neon-coral animate-pulse" />
                    <h2 className="text-4xl font-bold font-sora bg-gradient-to-r from-neon-coral via-neon-aqua to-neon-purple bg-clip-text text-transparent">
                      Ready to Experience the Future?
                    </h2>
                    <Sparkles className="w-8 h-8 text-neon-aqua animate-pulse" />
                  </div>
                  <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Join <span className="text-neon-coral font-bold">thousands of developers</span> who are already building faster with 
                    <span className="text-neon-aqua font-bold"> DevSynth AI</span>
                  </p>
                  <HoverGlow>
                    <button
                      onClick={() => navigate('/login')}
                      className="px-8 py-4 bg-gradient-to-r from-neon-coral to-neon-aqua rounded-xl text-lg font-bold hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-neon-coral/25 group"
                    >
                      <span className="flex items-center gap-3">
                        Start Building Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
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
