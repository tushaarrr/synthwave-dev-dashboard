
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
      gradient: "from-orange-400 to-orange-500"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team",
      value: "+1 (555) 123-4567",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our headquarters",
      value: "San Francisco, CA",
      gradient: "from-orange-600 to-amber-600"
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
                  Get in Touch
                </h1>
                <Sparkles className="w-8 h-8 text-orange-300 animate-pulse" />
              </div>
              <p className="text-xl text-orange-200/80 max-w-3xl mx-auto leading-relaxed">
                Have questions about DevSynth AI? We'd love to hear from you. 
                <span className="text-orange-300 font-semibold"> Send us a message</span> and we'll respond as soon as possible.
              </p>
            </div>
          </FadeInUp>

          {/* Contact Info Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <SlideIn key={info.title} delay={index * 0.2} direction="up">
                <motion.div
                  className="glass-dark rounded-3xl p-8 border border-orange-200/10 hover:border-orange-300/30 transition-all duration-500 text-center"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${info.gradient}/20 rounded-3xl flex items-center justify-center mx-auto mb-6`}>
                    <info.icon className="w-10 h-10 text-orange-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-orange-200 font-sora mb-2">{info.title}</h3>
                  <p className="text-orange-200/60 mb-4">{info.description}</p>
                  <p className="text-orange-300 font-semibold text-lg">{info.value}</p>
                </motion.div>
              </SlideIn>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <SlideIn delay={0.4} direction="left">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400/20 to-orange-500/20 rounded-2xl flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-orange-400" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold text-orange-200 font-sora">Send us a Message</h2>
                    <p className="text-orange-200/60 text-lg">We'll get back to you within 24 hours</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-zinc-900" />
                    </div>
                    <span className="text-orange-200/80 text-lg">Quick response time (usually within 4 hours)</span>
                  </motion.div>
                  
                  <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-zinc-900" />
                    </div>
                    <span className="text-orange-200/80 text-lg">Dedicated support team</span>
                  </motion.div>
                  
                  <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-zinc-900" />
                    </div>
                    <span className="text-orange-200/80 text-lg">Personalized solutions for your needs</span>
                  </motion.div>
                </div>
              </div>
            </SlideIn>

            <SlideIn delay={0.6} direction="right">
              <form onSubmit={handleSubmit} className="glass-dark rounded-3xl p-8 border border-orange-200/10 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-orange-200/80">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-orange-200/20 rounded-xl text-orange-200 placeholder-orange-200/40 focus:border-orange-300/50 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-orange-200/80">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-orange-200/20 rounded-xl text-orange-200 placeholder-orange-200/40 focus:border-orange-300/50 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-orange-200/80">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-orange-200/20 rounded-xl text-orange-200 placeholder-orange-200/40 focus:border-orange-300/50 focus:outline-none transition-colors"
                    placeholder="Your company (optional)"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-orange-200/80">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-orange-200/20 rounded-xl text-orange-200 placeholder-orange-200/40 focus:border-orange-300/50 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project or question..."
                  />
                </div>

                <HoverGlow>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl font-semibold text-zinc-900 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-400/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-zinc-900/30 border-t-zinc-900 rounded-full animate-spin inline-block mr-2"></div>
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
              <div className="glass-dark rounded-3xl p-12 border border-orange-200/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 via-orange-300/5 to-orange-500/5"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold font-sora gradient-text mb-4">
                    Prefer to try DevSynth first?
                  </h2>
                  <p className="text-lg text-orange-200/80 mb-8 max-w-2xl mx-auto">
                    Experience the power of AI-driven development tools with our free trial
                  </p>
                  <HoverGlow>
                    <button
                      onClick={() => navigate('/login')}
                      className="px-12 py-4 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl text-lg font-bold text-zinc-900 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-400/25"
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
