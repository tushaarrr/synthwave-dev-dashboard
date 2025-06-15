
import { motion } from "framer-motion";
import { ArrowLeft, Check, Zap, Crown, Star, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/motion/PageTransition";
import { FadeInUp, SlideIn, HoverGlow } from "@/components/motion/MotionWrapper";

const PricingPage = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for getting started with AI development tools",
      features: [
        "5 AI analyses per month",
        "Basic code optimization",
        "Standard support",
        "Community access",
        "Basic templates"
      ],
      gradient: "from-zinc-500 to-zinc-600",
      buttonText: "Get Started",
      popular: false,
      icon: Zap
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "Advanced features for professional developers",
      features: [
        "Unlimited AI analyses",
        "Advanced code optimization",
        "Priority support",
        "Advanced templates",
        "Team collaboration",
        "Export capabilities",
        "Custom integrations"
      ],
      gradient: "from-orange-500 to-orange-600",
      buttonText: "Start Pro Trial",
      popular: true,
      icon: Star
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "Complete solution for large teams and organizations",
      features: [
        "Everything in Pro",
        "Dedicated support",
        "Custom AI models",
        "Advanced analytics",
        "SSO integration",
        "On-premise deployment",
        "24/7 phone support",
        "Custom training"
      ],
      gradient: "from-orange-600 to-amber-600",
      buttonText: "Contact Sales",
      popular: false,
      icon: Crown
    }
  ];

  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 14-day free trial for our Pro plan with full access to all features."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise customers."
    },
    {
      question: "Can I cancel my subscription?",
      answer: "You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period."
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-zinc-900 text-orange-200 relative overflow-hidden">
        {/* Exact same background as landing page */}
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
              Back to Home
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
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-orange-400 animate-pulse" />
                <h1 className="text-6xl font-bold font-sora gradient-text">
                  Simple, Transparent Pricing
                </h1>
                <Sparkles className="w-8 h-8 text-orange-300 animate-pulse" />
              </div>
              <p className="text-xl text-orange-200/80 max-w-3xl mx-auto leading-relaxed">
                Choose the perfect plan for your development needs. 
                <span className="text-orange-300 font-semibold"> Start free</span> and 
                <span className="text-orange-400 font-semibold"> scale as you grow</span>
              </p>
            </div>
          </FadeInUp>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => (
              <SlideIn key={plan.name} delay={index * 0.2} direction="up">
                <motion.div
                  className={`relative glass-dark rounded-3xl p-8 border transition-all duration-500 ${
                    plan.popular 
                      ? 'border-orange-400/50 shadow-2xl shadow-orange-400/20 scale-105' 
                      : 'border-orange-200/10 hover:border-orange-300/30'
                  }`}
                  whileHover={{ scale: plan.popular ? 1.05 : 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-6 py-2 rounded-full text-sm font-semibold text-zinc-900">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${plan.gradient}/20 rounded-2xl flex items-center justify-center`}>
                      <plan.icon className="w-8 h-8 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-orange-200 font-sora">{plan.name}</h3>
                      <p className="text-orange-200/60">{plan.description}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-orange-200 font-sora">{plan.price}</span>
                      <span className="text-orange-200/60">/{plan.period}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="w-5 h-5 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-zinc-900" />
                        </div>
                        <span className="text-orange-200/80">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <HoverGlow>
                    <button
                      onClick={() => navigate('/login')}
                      className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                        plan.popular
                          ? `bg-gradient-to-r ${plan.gradient} hover:scale-105 shadow-lg shadow-orange-400/25 text-zinc-900`
                          : 'glass-dark border border-orange-200/20 hover:border-orange-300/30 hover:scale-105 text-orange-200'
                      }`}
                    >
                      {plan.buttonText}
                    </button>
                  </HoverGlow>
                </motion.div>
              </SlideIn>
            ))}
          </div>

          {/* FAQ Section */}
          <FadeInUp delay={0.6}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-sora gradient-text mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-orange-200/80 max-w-2xl mx-auto">
                Everything you need to know about our pricing and plans
              </p>
            </div>
          </FadeInUp>

          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {faqs.map((faq, index) => (
              <SlideIn key={index} delay={index * 0.1} direction="up">
                <motion.div
                  className="glass-dark rounded-2xl p-6 border border-orange-200/10 hover:border-orange-300/30 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-xl font-semibold text-orange-200 mb-3 font-sora">{faq.question}</h3>
                  <p className="text-orange-200/70 leading-relaxed">{faq.answer}</p>
                </motion.div>
              </SlideIn>
            ))}
          </div>

          {/* CTA Section */}
          <FadeInUp delay={1.0}>
            <div className="text-center">
              <div className="glass-dark rounded-3xl p-16 border border-orange-200/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 via-orange-300/5 to-orange-500/5"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <Sparkles className="w-10 h-10 text-orange-400 animate-pulse" />
                    <h2 className="text-5xl font-bold font-sora gradient-text">
                      Ready to Get Started?
                    </h2>
                    <Sparkles className="w-10 h-10 text-orange-300 animate-pulse" />
                  </div>
                  <p className="text-xl text-orange-200/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                    Join <span className="text-orange-400 font-bold">thousands of developers</span> who trust DevSynth AI to 
                    <span className="text-orange-300 font-bold"> accelerate their development process</span>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <HoverGlow>
                      <button
                        onClick={() => navigate('/login')}
                        className="px-12 py-4 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl text-lg font-bold text-zinc-900 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-400/25 group"
                      >
                        <span className="flex items-center gap-3">
                          Start Free Trial
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </span>
                      </button>
                    </HoverGlow>
                    <button
                      onClick={() => navigate('/contact')}
                      className="px-12 py-4 glass-dark border border-orange-200/20 rounded-2xl text-lg font-semibold text-orange-200 hover:border-orange-300/30 hover:scale-105 transition-all duration-300"
                    >
                      Contact Sales
                    </button>
                  </div>
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
