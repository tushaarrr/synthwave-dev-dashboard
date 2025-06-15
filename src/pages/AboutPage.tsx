
import { motion } from "framer-motion";
import { ArrowLeft, Code2, Users, Zap, Target, Award, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/motion/PageTransition";
import { FadeInUp } from "@/components/motion/MotionWrapper";

const AboutPage = () => {
  const navigate = useNavigate();

  const stats = [
    { number: "10,000+", label: "Developers" },
    { number: "50,000+", label: "Projects Generated" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "AI Support" }
  ];

  const team = [
    { name: "AI Core Engine", role: "Neural Processing", avatar: "🤖" },
    { name: "Code Analyzer", role: "Pattern Recognition", avatar: "🔍" },
    { name: "Stack Generator", role: "Architecture Planning", avatar: "⚡" },
    { name: "SQL Optimizer", role: "Query Enhancement", avatar: "🛠️" }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-zinc-900 text-orange-200 relative overflow-hidden">
        {/* Exact same background as ContactPage */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-200/10 via-zinc-900 to-orange-200/10"></div>
          <motion.div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(253, 186, 116, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(253, 186, 116, 0.3) 1px, transparent 1px)
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
        <nav className="relative z-10 p-6 glass-dark border-b border-orange-200/10">
          <div className="container mx-auto flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-orange-300 hover:text-orange-200 transition-all duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </button>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold font-sora gradient-text">
                DevSynth
              </span>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl font-semibold text-zinc-900 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-orange-400/25"
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
              <motion.div 
                className="flex items-center justify-center gap-3 mb-6"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400/20 to-orange-500/20 rounded-2xl flex items-center justify-center">
                  <Code2 className="w-8 h-8 text-orange-400" />
                </div>
                <h1 className="text-4xl font-bold font-sora gradient-text">
                  About DevSynth AI
                </h1>
              </motion.div>
              <p className="text-xl text-orange-200/80 max-w-3xl mx-auto leading-relaxed">
                The ultimate AI-powered productivity suite designed specifically for modern developers, 
                engineers, and technical teams who demand excellence.
              </p>
            </div>
          </FadeInUp>

          {/* Mission Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <FadeInUp delay={0.2}>
              <div>
                <h2 className="text-3xl font-bold mb-6 gradient-text">
                  Our Mission
                </h2>
                <p className="text-orange-200/80 mb-6 text-lg leading-relaxed">
                  We believe that every developer deserves tools that amplify their creativity and accelerate their productivity. 
                  DevSynth AI bridges the gap between human expertise and artificial intelligence.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Target, text: "Accelerate development workflows by 10x" },
                    { icon: Zap, text: "Eliminate repetitive coding tasks" },
                    { icon: Users, text: "Empower teams with AI-driven insights" },
                    { icon: Award, text: "Maintain the highest code quality standards" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-400/20 to-orange-500/20 rounded-xl flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-orange-400" />
                      </div>
                      <span className="text-orange-200/80">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.4}>
              <div className="relative">
                <div className="glass-dark rounded-3xl p-8 border border-orange-200/10">
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        className="text-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <div className="text-3xl font-bold gradient-text mb-2">
                          {stat.number}
                        </div>
                        <div className="text-orange-200/60 text-sm">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>

          {/* AI Team Section */}
          <FadeInUp delay={0.6}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6 gradient-text">
                Meet Our AI Team
              </h2>
              <p className="text-orange-200/60 max-w-2xl mx-auto">
                Our specialized AI agents work together to provide you with the most comprehensive development experience.
              </p>
            </div>
          </FadeInUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="glass-dark rounded-3xl p-6 border border-orange-200/10 text-center hover:border-orange-300/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-4">{member.avatar}</div>
                <h3 className="font-semibold text-orange-200 mb-2">{member.name}</h3>
                <p className="text-orange-200/60 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>

          {/* Values Section */}
          <FadeInUp delay={1.0}>
            <div className="glass-dark rounded-3xl p-12 border border-orange-200/10 text-center">
              <Heart className="w-12 h-12 text-orange-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-6 gradient-text">
                Built with Love for Developers
              </h2>
              <p className="text-orange-200/80 text-lg max-w-3xl mx-auto leading-relaxed">
                Every feature in DevSynth AI is crafted with deep understanding of developer pain points. 
                We're not just building tools – we're creating an ecosystem that understands your workflow 
                and adapts to your unique coding style.
              </p>
            </div>
          </FadeInUp>
        </div>
      </div>
    </PageTransition>
  );
};

export default AboutPage;
