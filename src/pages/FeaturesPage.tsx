
import { motion } from "framer-motion";
import { ArrowLeft, Zap, FileText, Code, Database, Download, ArrowRight, CheckCircle } from "lucide-react";
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        {/* Navigation */}
        <nav className="p-6 border-b border-white/10 backdrop-blur-xl bg-black/20">
          <div className="container mx-auto flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-gradient-to-r from-neon-coral to-neon-aqua rounded-xl font-semibold hover:scale-105 transition-transform"
            >
              Try Now
            </button>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-16">
          {/* Hero Section */}
          <FadeInUp>
            <div className="text-center mb-20">
              <h1 className="text-5xl font-bold font-sora mb-6 bg-gradient-to-r from-neon-coral to-neon-aqua bg-clip-text text-transparent">
                Powerful AI Features
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover the comprehensive suite of AI-powered tools designed to supercharge your development workflow
              </p>
            </div>
          </FadeInUp>

          {/* Features Grid */}
          <div className="space-y-20">
            {features.map((feature, index) => (
              <SlideIn 
                key={feature.id} 
                delay={index * 0.2} 
                direction={index % 2 === 0 ? 'left' : 'right'}
              >
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Feature Content */}
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient}/20 rounded-2xl flex items-center justify-center`}>
                        <feature.icon className={`w-8 h-8 text-neon-coral`} />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white">{feature.title}</h2>
                        <p className="text-gray-400">{feature.description}</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      {feature.benefits.map((benefit, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <span className="text-gray-300">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>

                    <HoverGlow>
                      <button
                        onClick={() => navigate('/login')}
                        className={`group px-8 py-4 bg-gradient-to-r ${feature.gradient} rounded-2xl font-semibold text-white overflow-hidden relative`}
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
                      className="glass-dark backdrop-blur-xl rounded-3xl p-8 border border-white/10"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-400 ml-4">{feature.title.toLowerCase()}.ai</span>
                        </div>
                        
                        {feature.demoFeatures.map((demo, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: i * 0.2 }}
                          >
                            <div className={`w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full`}></div>
                            <span className="text-gray-300">{demo}</span>
                            <div className="ml-auto">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
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
            <div className="text-center mt-20">
              <div className="glass-dark backdrop-blur-xl rounded-3xl p-12 border border-white/10">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-neon-coral to-neon-aqua bg-clip-text text-transparent">
                  Ready to Experience the Future?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of developers who are already building faster with DevSynth AI
                </p>
                <HoverGlow>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-12 py-4 bg-gradient-to-r from-neon-coral to-neon-aqua rounded-2xl text-lg font-semibold hover:scale-105 transition-transform"
                  >
                    Start Building Now
                  </button>
                </HoverGlow>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </PageTransition>
  );
};

export default FeaturesPage;
