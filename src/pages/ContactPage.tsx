
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, MessageSquare, Send, MapPin, Clock, Phone } from "lucide-react";
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
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
      description: "We'll respond within 24 hours"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      content: "Available 24/7",
      description: "Get instant help from our AI assistant"
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Global Remote",
      description: "Serving developers worldwide"
    }
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

        <div className="container mx-auto px-6 py-16">
          {/* Hero Section */}
          <FadeInUp>
            <div className="text-center mb-20">
              <h1 className="text-5xl font-bold font-sora mb-6 bg-gradient-to-r from-neon-coral to-neon-aqua bg-clip-text text-transparent">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Have questions about DevSynth AI? We're here to help. Reach out to our team 
                and we'll get back to you as soon as possible.
              </p>
            </div>
          </FadeInUp>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <SlideIn direction="left">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-aqua to-emerald-400 bg-clip-text text-transparent">
                    Contact Information
                  </h2>
                  <p className="text-gray-400 leading-relaxed">
                    Choose the best way to reach us. Our team is standing by to help you 
                    make the most of DevSynth AI.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      className="glass-dark backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-neon-aqua/30 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-neon-aqua/20 to-neon-purple/20 rounded-xl flex items-center justify-center">
                          <info.icon className="w-6 h-6 text-neon-aqua" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                          <p className="text-neon-aqua font-medium mb-1">{info.content}</p>
                          <p className="text-gray-400 text-sm">{info.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Office Hours */}
                <motion.div
                  className="glass-dark backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-neon-coral" />
                    <h3 className="font-semibold text-white">Response Times</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email Support:</span>
                      <span className="text-gray-300">Within 24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Live Chat:</span>
                      <span className="text-gray-300">Instant</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Enterprise:</span>
                      <span className="text-gray-300">Within 4 hours</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </SlideIn>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <SlideIn direction="right">
                <motion.div 
                  className="glass-dark backdrop-blur-xl rounded-3xl p-8 border border-white/10"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-coral to-neon-orange bg-clip-text text-transparent">
                    Send us a Message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full glass-dark border border-white/20 rounded-xl py-4 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-aqua/50 focus:border-neon-aqua/50 transition-all duration-300"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full glass-dark border border-white/20 rounded-xl py-4 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-aqua/50 focus:border-neon-aqua/50 transition-all duration-300"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full glass-dark border border-white/20 rounded-xl py-4 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-aqua/50 focus:border-neon-aqua/50 transition-all duration-300"
                        placeholder="Subject"
                      />
                    </div>

                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full glass-dark border border-white/20 rounded-xl py-4 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-aqua/50 focus:border-neon-aqua/50 transition-all duration-300 resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative group py-4 bg-gradient-to-r from-neon-coral to-neon-aqua rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </span>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-neon-orange to-neon-coral opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ opacity: 1 }}
                      />
                    </motion.button>
                  </form>
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
