
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Github, ArrowRight, Sparkles, Terminal, Code2, Database, Zap } from 'lucide-react';
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
    { text: "Analyzing SQL schema...", status: "loading" },
    { text: "SQL optimization complete ✅", status: "success" },
    { text: "Generating project roadmap...", status: "loading" },
    { text: "Tech stack recommendations ready ✅", status: "success" },
    { text: "Code analysis in progress...", status: "loading" },
    { text: "Performance insights generated ✅", status: "success" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-12 h-12 border-2 border-transparent border-t-violet-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
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

  const handleGithubAuth = async () => {
    try {
      setError('');
      const { supabase } = await import('@/integrations/supabase/client');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Logo & Branding */}
          <div className="text-center mb-8">
            <motion.div 
              className="flex items-center justify-center space-x-3 mb-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-xl flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-xl blur opacity-50 animate-pulse"></div>
              </div>
              <h1 className="text-2xl font-bold font-sora bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                DevSynth AI
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-white mb-2">
                {isLogin ? 'Welcome Back' : 'Join the Platform'}
              </h2>
              <p className="text-slate-400 text-sm">
                For developers, engineers, and AI builders
              </p>
            </motion.div>
          </div>

          {/* Login Card */}
          <motion.div 
            className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl py-4 font-medium transition-all duration-300 hover:border-white/30 disabled:opacity-50 group"
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-white">Continue with Google</span>
              </button>

              <button
                onClick={handleGithubAuth}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl py-4 font-medium transition-all duration-300 hover:border-white/30 disabled:opacity-50 group"
              >
                <Github className="w-5 h-5 text-white" />
                <span className="text-white">Continue with GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-900/50 text-slate-400 rounded-lg">
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
                  className="w-full bg-white/5 border border-white/20 rounded-xl py-4 px-4 pl-12 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 peer"
                  placeholder="Enter your email"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 peer-focus:text-cyan-400 transition-colors" />
              </div>

              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-xl py-4 px-4 pl-12 pr-12 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 peer"
                  placeholder="Enter your password"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 peer-focus:text-cyan-400 transition-colors" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
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
                      className="w-4 h-4 text-cyan-500 bg-white/5 border-white/20 rounded focus:ring-cyan-500/50"
                    />
                    <span className="text-slate-400">Remember me</span>
                  </label>
                  <button type="button" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full relative group py-4 bg-gradient-to-r from-cyan-600 to-violet-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {isLogin ? 'Signing In...' : 'Creating Account...'}
                    </>
                  ) : (
                    <>
                      {isLogin ? '🔓 Log In Securely' : 'Create Account'}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </form>

            {/* Toggle Login/Signup */}
            <div className="text-center mt-6">
              <span className="text-slate-400 text-sm">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium text-sm"
              >
                {isLogin ? 'Create a new account' : 'Sign in'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Panel - Hero/Animation Section */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              animation: 'float 20s ease-in-out infinite'
            }}
          />
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 left-1/2 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>

        <motion.div 
          className="relative z-10 text-center max-w-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Typewriter Effect */}
          <div className="mb-12">
            <motion.h2 
              className="text-5xl font-bold text-white mb-4"
              key={currentTextIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              {heroTexts[currentTextIndex]}
            </motion.h2>
            <p className="text-xl text-slate-400">
              The AI-powered platform for modern developers
            </p>
          </div>

          {/* Terminal Mockup */}
          <motion.div 
            className="bg-slate-800/50 backdrop-blur border border-white/10 rounded-xl p-6 text-left"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <Terminal className="w-4 h-4 text-slate-400 ml-auto" />
            </div>
            
            <div className="space-y-2 font-mono text-sm">
              {terminalLogs.map((log, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.2 }}
                >
                  {log.status === 'loading' ? (
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  ) : (
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  )}
                  <span className={log.status === 'loading' ? 'text-cyan-400' : 'text-green-400'}>
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
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <Database className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-xs text-slate-400">SQL Doctor</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center gap-2"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-violet-400" />
              </div>
              <span className="text-xs text-slate-400">AI Prompts</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center gap-2"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-xs text-slate-400">Stack Wizard</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
