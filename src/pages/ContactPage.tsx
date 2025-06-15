
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, MapPin, Send, MessageCircle, Sparkles, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/motion/PageTransition";
import { FadeInUp, SlideIn, HoverGlow } from "@/components/motion/MotionWrapper";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", company: "", message: "" });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email",
      value: "hello@devsynth.ai",
      gradient: "from-neon-coral to-neon-orange"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team",
      value: "+1 (555) 123-4567",
      gradient: "from-neon-aqua to-cyan-400"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our headquarters",
      value: "San Francisco, CA",
      gradient: "from-neon-purple to-indigo-600"
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
                className="px-6 py-2 bg-gradient-to-r from-neon-coral to-neon-aqua rounded-xl font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-neon-coral/25"
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
                  Get in Touch
                </h1>
                <Sparkles className="w-8 h-8 text-neon-aqua animate-pulse" />
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Have questions about DevSynth AI? We'd love to hear from you. 
                <span className="text-neon-aqua font-semibold"> Send us a message</span> and we'll respond as soon as possible.
              </p>
            </div>
          </FadeInUp>

          {/* Contact Info Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <SlideIn key={info.title} delay={index * 0.2} direction="up">
                <motion.div
                  className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 rounded-3xl p-8 border border-white/10 hover:border-neon-aqua/30 transition-all duration-500 text-center"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${info.gradient}/20 rounded-3xl flex items-center justify-center mx-auto mb-6`}>
                    <info.icon className="w-10 h-10 text-neon-coral" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-sora mb-2">{info.title}</h3>
                  <p className="text-gray-400 mb-4">{info.description}</p>
                  <p className="text-neon-aqua font-semibold text-lg">{info.value}</p>
                </motion.div>
              </SlideIn>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <SlideIn delay={0.4} direction="left">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-neon-coral/20 to-neon-orange/20 rounded-2xl flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-neon-coral" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold text-white font-sora">Send us a Message</h2>
                    <p className="text-gray-400 text-lg">We'll get back to you within 24 hours</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-neon-aqua rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-300 text-lg">Quick response time (usually within 4 hours)</span>
                  </motion.div>
                  
                  <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-neon-aqua rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-300 text-lg">Dedicated support team</span>
                  </motion.div>
                  
                  <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-neon-aqua rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-300 text-lg">Personalized solutions for your needs</span>
                  </motion.div>
                </div>
              </div>
            </SlideIn>

            <SlideIn delay={0.6} direction="right">
              <form onSubmit={handleSubmit} className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 rounded-3xl p-8 border border-white/10 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-neon-aqua/50 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-neon-aqua/50 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-gray-300">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-neon-aqua/50 focus:outline-none transition-colors"
                    placeholder="Your company (optional)"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-neon-aqua/50 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project or question..."
                  />
                </div>

                <HoverGlow>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-neon-coral to-neon-aqua rounded-2xl font-semibold text-white hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-neon-coral/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 inline-block mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </HoverGlow>
              </form>
            </SlideIn>
          </div>

          {/* Additional CTA */}
          <FadeInUp delay={1.0}>
            <div className="text-center mt-20">
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 rounded-3xl p-12 border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-coral/5 via-neon-aqua/5 to-neon-purple/5"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold font-sora bg-gradient-to-r from-neon-coral to-neon-aqua bg-clip-text text-transparent mb-4">
                    Prefer to try DevSynth first?
                  </h2>
                  <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                    Experience the power of AI-driven development tools with our free trial
                  </p>
                  <HoverGlow>
                    <button
                      onClick={() => navigate('/login')}
                      className="px-12 py-4 bg-gradient-to-r from-neon-coral to-neon-aqua rounded-2xl text-lg font-bold hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-neon-coral/25"
                    >
                      Start Free Trial
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

export default ContactPage;
