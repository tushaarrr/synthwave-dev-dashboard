
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Lock, Eye, Database, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/motion/PageTransition";
import { FadeInUp } from "@/components/motion/MotionWrapper";

const PrivacyPage = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support."
    },
    {
      icon: Eye,
      title: "How We Use Your Information", 
      content: "We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you."
    },
    {
      icon: Shield,
      title: "Information Sharing",
      content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy."
    },
    {
      icon: Lock,
      title: "Data Security",
      content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
    }
  ];

  const dataTypes = [
    "Account information (email, name)",
    "Usage data and analytics",
    "AI-generated content and prompts",
    "Device and browser information",
    "Communication preferences"
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        {/* Navigation */}
        <nav className="p-6 border-b border-white/10 backdrop-blur-xl bg-black/20">
          <div className="container mx-auto flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-16 max-w-4xl">
          {/* Header */}
          <FadeInUp>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-neon-aqua rounded-2xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold font-sora bg-gradient-to-r from-emerald-400 to-neon-aqua bg-clip-text text-transparent">
                  Privacy Policy
                </h1>
              </div>
              <div className="flex items-center justify-center gap-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Last updated: December 15, 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>GDPR Compliant</span>
                </div>
              </div>
            </div>
          </FadeInUp>

          {/* Introduction */}
          <FadeInUp delay={0.2}>
            <div className="glass-dark backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-12">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-neon-aqua bg-clip-text text-transparent">
                Your Privacy Matters
              </h2>
              <p className="text-gray-300 leading-relaxed">
                At DevSynth AI, we are committed to protecting your privacy and ensuring transparency 
                about how we collect, use, and protect your information. This Privacy Policy explains 
                our practices regarding your personal data.
              </p>
            </div>
          </FadeInUp>

          {/* Data Collection Overview */}
          <FadeInUp delay={0.3}>
            <div className="glass-dark backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-12">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-coral to-neon-orange bg-clip-text text-transparent">
                Data We Collect
              </h2>
              <div className="grid gap-4">
                {dataTypes.map((type, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-gray-300">{type}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInUp>

          {/* Main Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <FadeInUp key={index} delay={0.4 + index * 0.1}>
                <motion.div
                  className="glass-dark backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-emerald-400/30 transition-all duration-300"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/20 to-neon-aqua/20 rounded-xl flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">{section.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{section.content}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeInUp>
            ))}
          </div>

          {/* Your Rights */}
          <FadeInUp delay={0.8}>
            <div className="glass-dark backdrop-blur-xl rounded-3xl p-8 border border-white/10 mt-12">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-violet-400 bg-clip-text text-transparent">
                Your Rights
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Access your personal data",
                  "Correct inaccurate information",
                  "Delete your data",
                  "Data portability",
                  "Opt-out of marketing communications",
                  "Withdraw consent"
                ].map((right, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Shield className="w-5 h-5 text-neon-purple" />
                    <span className="text-gray-300">{right}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInUp>

          {/* Contact Information */}
          <FadeInUp delay={1.0}>
            <div className="glass-dark backdrop-blur-xl rounded-3xl p-8 border border-white/10 mt-12 text-center">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-neon-aqua bg-clip-text text-transparent">
                Questions About Privacy?
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, 
                please contact our privacy team at privacy@devsynth.ai
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-neon-aqua rounded-xl font-semibold hover:scale-105 transition-transform"
              >
                Contact Privacy Team
              </button>
            </div>
          </FadeInUp>
        </div>
      </div>
    </PageTransition>
  );
};

export default PrivacyPage;
