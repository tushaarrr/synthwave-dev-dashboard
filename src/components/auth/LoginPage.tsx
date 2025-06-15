
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Code2, Terminal, Database, Sparkles, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginPage = () => {
  const { user, loading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const heroTexts = [
    "Design faster",
    "Deploy smarter", 
    "Query better",
    "Build like a CTO"
  ];

  const terminalLogs = [
    { text: "Initializing DevSynth AI...", status: "loading" },
    { text: "Neural networks activated ✅", status: "success" },
    { text: "Analyzing code patterns...", status: "loading" },
    { text: "AI models synchronized ✅", status: "success" },
    { text: "System ready for development...", status: "loading" },
    { text: "Developer tools connected ✅", status: "success" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-200 border-t-orange-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`
          }
        });
        if (error) throw error;
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setError('');
      await signInWithGoogle();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex relative overflow-hidden">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo & Branding */}
          <div className="text-center mb-8">
            <motion.div 
              className="flex items-center justify-center space-x-3 mb-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold font-sora text-gray-800">
                DevSynth AI
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-2 font-sora">
                {isLogin ? 'Welcome Back' : 'Join DevSynth'}
              </h2>
              <p className="text-gray-600 text-sm font-inter">
                For developers, engineers, and AI builders
              </p>
            </motion.div>
          </div>

          {/* Login Card */}
          <motion.div 
            className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-600 text-sm font-inter"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google Login Button */}
            <div className="space-y-4 mb-6">
              <button
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-gray-300 rounded-xl py-3 font-medium transition-all duration-200 disabled:opacity-50 group font-inter text-gray-700 hover:bg-gray-50"
              >
                <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-gray-700 font-inter">Continue with Google</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-inter">
                  or use your email
                </span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-5">
              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 pl-12 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200 font-inter"
                  placeholder="Enter your email"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 pl-12 pr-12 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200 font-inter"
                  placeholder="Enter your password"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Remember Me & Forgot Password */}
              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-orange-400 bg-gray-50 border-gray-300 rounded focus:ring-orange-400"
                    />
                    <span className="text-gray-600 font-inter">Remember me</span>
                  </label>
                  <button type="button" className="text-orange-500 hover:text-orange-600 transition-colors font-inter">
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-inter shadow-sm"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <span className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {isLogin ? 'Signing in...' : 'Creating account...'}
                    </>
                  ) : (
                    <>
                      {isLogin ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </span>
              </motion.button>
            </form>

            {/* Toggle Login/Signup */}
            <div className="text-center mt-6">
              <span className="text-gray-600 text-sm font-inter">
                {isLogin ? "New to DevSynth? " : "Already have an account? "}
              </span>
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-orange-500 hover:text-orange-600 transition-colors font-medium text-sm font-inter"
              >
                {isLogin ? 'Create account' : 'Sign in'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Panel - Hero/Animation Section */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative overflow-hidden bg-orange-50">
        <motion.div 
          className="relative z-10 text-center max-w-lg"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Typewriter Effect */}
          <div className="mb-12">
            <motion.h2 
              className="text-5xl font-bold text-gray-800 mb-4 font-sora"
              key={currentTextIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-orange-500">
                {heroTexts[currentTextIndex]}
              </span>
            </motion.h2>
            <p className="text-xl text-gray-600 font-inter">
              The AI-powered development platform for modern teams
            </p>
          </div>

          {/* Terminal Mockup */}
          <motion.div 
            className="bg-white border border-gray-200 rounded-2xl p-6 text-left shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <Terminal className="w-4 h-4 text-orange-500 ml-auto" />
            </div>
            
            <div className="space-y-2 font-mono text-sm">
              {terminalLogs.map((log, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.3 }}
                >
                  {log.status === 'loading' ? (
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  ) : (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                  <span className={log.status === 'loading' ? 'text-orange-500' : 'text-green-600'}>
                    {log.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Feature Icons */}
          <motion.div 
            className="flex justify-center gap-8 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div 
              className="flex flex-col items-center gap-2"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-200 shadow-sm">
                <Database className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-xs text-gray-600 font-inter">SQL Doctor</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center gap-2"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-200 shadow-sm">
                <Sparkles className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-xs text-gray-600 font-inter">AI Prompts</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center gap-2"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-200 shadow-sm">
                <Zap className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-xs text-gray-600 font-inter">Stack Wizard</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
