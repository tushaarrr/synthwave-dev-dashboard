
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, MessageSquare, Send, MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/motion/PageTransition";
import { FadeInUp, SlideIn } from "@/components/motion/MotionWrapper";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message sent! 🚀",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email us",
      content: "hello@devsynth.ai",
      description: "We'll respond within 24 hours",
      gradient: "from-neon-coral to-neon-orange"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      content: "Available 24/7",
      description: "Get instant help from our AI assistant",
      gradient: "from-neon-aqua to-cyan-400"
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Global Remote",
      description: "Serving developers worldwide",
      gradient: "from-neon-purple to-violet-600"
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
          <div className="container mx-auto flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-400 hover:text-neon-aqua transition-all duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Home
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
                  Get in Touch
                </h1>
                <Sparkles className="w-8 h-8 text-neon-aqua animate-pulse" />
              </div>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Have questions about DevSynth AI? We're here to help. 
                <span className="text-neon-aqua font-semibold"> Reach out to our team</span> and 
                <span className="text-neon-coral font-semibold"> we'll get back to you as soon as possible</span>
              </p>
            </div>
          </FadeInUp>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <SlideIn direction="left">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6 font-sora bg-gradient-to-r from-neon-aqua to-emerald-400 bg-clip-text text-transparent">
                    Contact Information
                  </h2>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    Choose the best way to reach us. Our team is standing by to help you 
                    make the most of DevSynth AI.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 rounded-3xl p-6 border border-white/10 hover:border-neon-aqua/30 transition-all duration-500"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 bg-gradient-to-r ${info.gradient}/20 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/10`}>
                          <info.icon className="w-7 h-7 text-neon-aqua" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white mb-2 text-lg">{info.title}</h3>
                          <p className="text-neon-aqua font-semibold mb-2">{info.content}</p>
                          <p className="text-gray-400">{info.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Office Hours */}
                <motion.div
                  className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 rounded-3xl p-6 border border-white/10 relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-coral/5 to-neon-orange/5"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-neon-coral to-neon-orange rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-white text-lg">Response Times</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        { type: "Email Support:", time: "Within 24 hours" },
                        { type: "Live Chat:", time: "Instant" },
                        { type: "Enterprise:", time: "Within 4 hours" }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                          <span className="text-gray-400">{item.type}</span>
                          <span className="text-neon-aqua font-semibold">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </SlideIn>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <SlideIn direction="right">
                <motion.div 
                  className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 rounded-3xl p-10 border border-white/10 relative overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-coral/5 to-neon-orange/5"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <h2 className="text-3xl font-bold font-sora bg-gradient-to-r from-neon-coral to-neon-orange bg-clip-text text-transparent">
                        Send us a Message
                      </h2>
                      <Sparkles className="w-6 h-6 text-neon-coral animate-pulse" />
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative group">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/20 rounded-2xl py-4 px-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-aqua/50 focus:border-neon-aqua/50 transition-all duration-300 group-hover:border-neon-aqua/30"
                            placeholder="Your Name"
                          />
                        </div>
                        <div className="relative group">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/20 rounded-2xl py-4 px-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-aqua/50 focus:border-neon-aqua/50 transition-all duration-300 group-hover:border-neon-aqua/30"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div className="relative group">
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/20 rounded-2xl py-4 px-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-aqua/50 focus:border-neon-aqua/50 transition-all duration-300 group-hover:border-neon-aqua/30"
                          placeholder="Subject"
                        />
                      </div>

                      <div className="relative group">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/20 rounded-2xl py-4 px-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-aqua/50 focus:border-neon-aqua/50 transition-all duration-300 resize-none group-hover:border-neon-aqua/30"
                          placeholder="Tell us how we can help you..."
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full relative group py-5 bg-gradient-to-r from-neon-coral to-neon-aqua rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-lg hover:shadow-lg hover:shadow-neon-coral/25"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          {isSubmitting ? (
                            <>
                              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Sending Message...
                            </>
                          ) : (
                            <>
                              Send Message
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </span>
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-neon-orange to-neon-coral opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ opacity: 1 }}
                        />
                      </motion.button>
                    </form>
                  </div>
                </motion.div>
              </SlideIn>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ContactPage;
