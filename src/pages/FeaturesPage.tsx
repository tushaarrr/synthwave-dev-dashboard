
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
      <div className="min-h-screen relative overflow-hidden bg-white">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50"></div>
          <div className="absolute top-20 left-10 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-100/15 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-50/30 rounded-full blur-3xl animate-pulse-glow"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 p-6 backdrop-blur-xl bg-white/80 border-b border-gray-200">
          <div className="container mx-auto flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </button>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold font-sora text-gray-800">
                DevSynth
              </span>
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-orange-400 text-white rounded-xl text-sm font-semibold hover:bg-orange-500 transition-colors"
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
                <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" />
                <h1 className="text-6xl font-bold font-sora text-gray-900">
                  Powerful AI Features
                </h1>
                <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" />
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
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center border border-orange-200">
                        <feature.icon className="w-8 h-8 text-orange-500" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 font-sora">{feature.title}</h2>
                        <p className="text-gray-600">{feature.description}</p>
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
                          <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>

                    <button
                      onClick={() => navigate('/login')}
                      className="group px-6 py-3 bg-orange-400 text-white rounded-xl font-semibold text-sm hover:bg-orange-500 transition-colors"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Try {feature.title}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>

                  {/* Feature Demo */}
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <motion.div
                      className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-300 transition-all duration-500 shadow-sm hover:shadow-md"
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
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {feature.title.toLowerCase()}.ai
                          </span>
                        </div>
                        
                        {feature.demoFeatures.map((demo, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-orange-200 transition-all duration-300"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.2 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            <span className="text-gray-700 font-medium">{demo}</span>
                            <div className="ml-auto flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-green-600">Active</span>
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
              <div className="bg-white rounded-3xl p-12 border border-orange-200 relative overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-50/50 via-white to-orange-50/50"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" />
                    <h2 className="text-4xl font-bold font-sora text-gray-900">
                      Ready to Experience the Future?
                    </h2>
                    <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" />
                  </div>
                  <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Join <span className="text-orange-500 font-bold">thousands of developers</span> who are already building faster with 
                    <span className="text-orange-600 font-bold"> DevSynth AI</span>
                  </p>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-8 py-4 bg-orange-400 text-white rounded-xl text-lg font-bold hover:bg-orange-500 transition-colors group"
                  >
                    <span className="flex items-center gap-3">
                      Start Building Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </button>
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
