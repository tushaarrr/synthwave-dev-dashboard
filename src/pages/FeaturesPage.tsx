
import { motion } from "framer-motion";
import { ArrowLeft, Zap, FileText, Code, Database, Download, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/motion/PageTransition";
import { FadeInUp, SlideIn, HoverGlow } from "@/components/motion/MotionWrapper";
import FloatingGeometry from "@/components/3D/FloatingGeometry";
import FloatingOrb from "@/components/3D/FloatingOrb";

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
      <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
        {/* 3D Background */}
        <FloatingGeometry />
        <FloatingOrb />

        {/* Animated Background - matching Dashboard */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50"></div>
          <motion.div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(251, 146, 60, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(251, 146, 60, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '50px 50px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 p-6 backdrop-blur-xl bg-white/80 border-b border-orange-200/20 shadow-sm">
          <div className="container mx-auto flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-all duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-orange-500" />
                <span className="text-2xl font-bold font-sora text-gray-800">
                  OneAI
                </span>
              </div>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-3 bg-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
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
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-8 h-8 text-orange-500" />
                </motion.div>
                <h1 className="text-6xl font-bold font-sora bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
                  Powerful AI Features
                </h1>
                <motion.div
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-8 h-8 text-orange-500" />
                </motion.div>
              </div>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Discover the comprehensive suite of AI-powered tools designed to 
                <span className="text-orange-500 font-semibold"> supercharge your development workflow</span> and 
                <span className="text-orange-600 font-semibold"> accelerate your productivity</span>
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
                    <motion.div
                      className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-orange-200/20 shadow-lg"
                      whileHover={{
                        boxShadow: "0 25px 50px rgba(251, 146, 60, 0.1)"
                      }}
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <motion.div 
                          className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg border border-orange-300/20"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <feature.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900 font-sora">{feature.title}</h2>
                          <p className="text-gray-600 mt-1">{feature.description}</p>
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
                            <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                              <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-700 group-hover:text-gray-900 transition-colors font-medium">{benefit}</span>
                          </motion.div>
                        ))}
                      </div>

                      <button
                        onClick={() => navigate('/login')}
                        className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold text-sm hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Try {feature.title}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </button>
                    </motion.div>
                  </div>

                  {/* Feature Demo */}
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <motion.div
                      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-orange-200/20 hover:border-orange-300/40 transition-all duration-500 shadow-lg hover:shadow-xl"
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
                          <span className="text-sm text-orange-600 font-medium bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                            {feature.title.toLowerCase()}.ai
                          </span>
                        </div>
                        
                        {feature.demoFeatures.map((demo, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center gap-3 p-3 rounded-xl bg-orange-50/80 backdrop-blur-sm border border-orange-100 hover:border-orange-200 transition-all duration-300 hover:shadow-md"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.2 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            <span className="text-gray-700 font-medium">{demo}</span>
                            <div className="ml-auto flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span className="text-xs text-green-600 font-medium">Active</span>
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
              <motion.div 
                className="bg-white/90 backdrop-blur-xl rounded-3xl p-12 border border-orange-200/20 relative overflow-hidden shadow-xl"
                whileHover={{
                  boxShadow: "0 25px 50px rgba(251, 146, 60, 0.15)"
                }}
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-400/5 via-transparent to-orange-300/5 rounded-3xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-8 h-8 text-orange-500" />
                    </motion.div>
                    <h2 className="text-4xl font-bold font-sora bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
                      Ready to Experience the Future?
                    </h2>
                    <motion.div
                      animate={{ rotate: [360, 0] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-8 h-8 text-orange-500" />
                    </motion.div>
                  </div>
                  <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Join <span className="text-orange-500 font-bold">thousands of developers</span> who are already building faster with 
                    <span className="text-orange-600 font-bold"> OneAI</span>
                  </p>
                  <motion.button
                    onClick={() => navigate('/login')}
                    className="px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl text-lg font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center gap-3">
                      Start Building Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </PageTransition>
  );
};

export default FeaturesPage;
