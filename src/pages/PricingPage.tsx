
import { motion } from "framer-motion";
import { ArrowLeft, Check, Star, Zap, Crown, Rocket, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/motion/PageTransition";
import { FadeInUp, ScaleIn, HoverGlow } from "@/components/motion/MotionWrapper";

const PricingPage = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for individual developers getting started",
      icon: Rocket,
      gradient: "from-gray-500 to-gray-600",
      features: [
        "5 AI generations per day",
        "Basic code analysis",
        "Community support",
        "Export to markdown"
      ],
      comingSoon: false,
      popular: false
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "For professional developers and small teams",
      icon: Zap,
      gradient: "from-neon-coral to-neon-orange",
      features: [
        "Unlimited AI generations",
        "Advanced code analysis",
        "Priority support",
        "Advanced export options",
        "Team collaboration",
        "API access"
      ],
      comingSoon: true,
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large teams and organizations",
      icon: Crown,
      gradient: "from-neon-purple to-violet-600",
      features: [
        "Everything in Pro",
        "Custom AI models",
        "Dedicated support",
        "On-premise deployment",
        "SSO integration",
        "Custom integrations"
      ],
      comingSoon: true,
      popular: false
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
              Get Started
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
                  Simple, Transparent Pricing
                </h1>
                <Sparkles className="w-8 h-8 text-neon-aqua animate-pulse" />
              </div>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Choose the perfect plan for your development needs. 
                <span className="text-neon-aqua font-semibold"> Start free</span> and 
                <span className="text-neon-coral font-semibold"> scale as you grow</span>
              </p>
            </div>
          </FadeInUp>

          {/* Coming Soon Banner */}
          <FadeInUp delay={0.2}>
            <div className="backdrop-blur-xl bg-gradient-to-r from-neon-coral/10 to-neon-orange/10 rounded-3xl p-8 border border-neon-coral/30 text-center mb-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-coral/5 to-neon-orange/5"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Star className="w-8 h-8 text-neon-coral animate-pulse" />
                  <h2 className="text-3xl font-bold font-sora bg-gradient-to-r from-neon-coral to-neon-orange bg-clip-text text-transparent">
                    Pricing Plans Coming Soon!
                  </h2>
                  <Star className="w-8 h-8 text-neon-coral animate-pulse" />
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  We're finalizing our pricing structure to give you the best value. 
                  Sign up now for <span className="text-neon-aqua font-semibold">early access</span> and 
                  <span className="text-neon-coral font-semibold"> special launch pricing!</span>
                </p>
              </div>
            </div>
          </FadeInUp>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {plans.map((plan, index) => (
              <ScaleIn key={index} delay={index * 0.2}>
                <motion.div
                  className={`relative backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 rounded-3xl p-8 border transition-all duration-500 hover:scale-105 ${
                    plan.popular ? 'border-neon-coral/50 hover:border-neon-coral' : 'border-white/10 hover:border-neon-aqua/30'
                  }`}
                  whileHover={{ y: -10 }}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-neon-coral to-neon-orange px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Coming Soon Badge */}
                  {plan.comingSoon && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-neon-aqua/20 border border-neon-aqua/30 px-4 py-2 rounded-full text-xs font-medium text-neon-aqua">
                        Coming Soon
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className={`w-20 h-20 bg-gradient-to-br ${plan.gradient}/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-xl border border-white/10`}>
                      <plan.icon className={`w-10 h-10 text-neon-coral`} />
                    </div>
                    <h3 className="text-3xl font-bold text-white font-sora mb-3">{plan.name}</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">{plan.description}</p>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold bg-gradient-to-r from-neon-coral to-neon-orange bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-gray-400 text-lg">{plan.period}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3 group"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-neon-aqua rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <HoverGlow>
                    <button
                      onClick={() => navigate('/login')}
                      className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 text-lg ${
                        plan.popular
                          ? 'bg-gradient-to-r from-neon-coral to-neon-orange text-white hover:scale-105 hover:shadow-lg hover:shadow-neon-coral/25'
                          : 'border border-white/20 text-white hover:bg-white/5 hover:border-neon-aqua/50'
                      }`}
                      disabled={plan.comingSoon}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {plan.comingSoon ? 'Notify Me' : plan.name === 'Starter' ? 'Start Free' : 'Get Started'}
                        {!plan.comingSoon && <ArrowRight className="w-4 h-4" />}
                      </span>
                    </button>
                  </HoverGlow>
                </motion.div>
              </ScaleIn>
            ))}
          </div>

          {/* FAQ Section */}
          <FadeInUp delay={0.8}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 rounded-3xl p-12 border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-aqua/5 to-emerald-400/5"></div>
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-center mb-16 font-sora bg-gradient-to-r from-neon-aqua to-emerald-400 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    {
                      q: "When will paid plans be available?",
                      a: "We're launching our paid plans in Q2 2024. Sign up now for early access and exclusive launch pricing!"
                    },
                    {
                      q: "Will there be a free tier?",
                      a: "Yes! Our Starter plan will remain free forever with basic features to help individual developers get started."
                    },
                    {
                      q: "Can I upgrade or downgrade anytime?",
                      a: "Absolutely! You'll be able to change your plan at any time. Upgrades take effect immediately, downgrades at the next billing cycle."
                    },
                    {
                      q: "Do you offer student discounts?",
                      a: "Yes! We'll offer 50% off Pro plans for verified students and educators. Stay tuned for more details."
                    }
                  ].map((faq, index) => (
                    <motion.div
                      key={index}
                      className="space-y-4 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-neon-aqua/30 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3 className="font-bold text-white text-lg">{faq.q}</h3>
                      <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </PageTransition>
  );
};

export default PricingPage;
