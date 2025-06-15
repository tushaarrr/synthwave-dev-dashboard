
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthProvider';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Database, 
  Code, 
  Sparkles, 
  TestTube, 
  Palette,
  FolderOpen,
  User,
  Zap,
  BarChart3
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import TopNavigation from '@/components/TopNavigation';
import PageTransition from '@/components/motion/PageTransition';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-neon-aqua/30 border-t-neon-aqua rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const tools = [
    {
      title: 'StackWizard+',
      description: 'AI-powered project planning and architecture',
      icon: Brain,
      color: 'from-neon-aqua to-neon-purple',
      route: '/modules/stackwizard',
      demoData: 'Build a job-matching AI SaaS platform for remote developers'
    },
    {
      title: 'PromptRefiner',
      description: 'Optimize and enhance your AI prompts',
      icon: Sparkles,
      color: 'from-neon-coral to-neon-orange',
      route: '/modules/prompt-refiner',
      demoData: 'Design a futuristic landing page for an AI dev tool'
    },
    {
      title: 'SQLDoctor',
      description: 'Analyze and optimize SQL queries',
      icon: Database,
      color: 'from-neon-purple to-violet-500',
      route: '/modules/sql-doctor',
      demoData: 'SELECT * FROM orders WHERE order_date > \'2023-01-01\';'
    },
    {
      title: 'CodeLens',
      description: 'Deep code analysis and optimization',
      icon: Code,
      color: 'from-emerald-400 to-neon-green',
      route: '/modules/code-lens',
      demoData: 'def calculate_total(cart): return sum([item[\'price\'] * item[\'qty\'] for item in cart])'
    },
    {
      title: 'TestCaseGen',
      description: 'Generate comprehensive test suites',
      icon: TestTube,
      color: 'from-neon-green to-emerald-400',
      route: '/testcasegen',
      demoData: 'React component testing with edge cases'
    },
    {
      title: 'ImageGen',
      description: 'AI-powered image generation',
      icon: Palette,
      color: 'from-neon-coral to-pink-500',
      route: '/imagegen',
      demoData: 'Generate an AI-themed 3D hero illustration'
    }
  ];

  const quickActions = [
    {
      title: 'Saved Projects',
      description: 'View and manage your projects',
      icon: FolderOpen,
      route: '/projects',
      color: 'from-blue-500 to-neon-aqua'
    },
    {
      title: 'Profile',
      description: 'Manage your account settings',
      icon: User,
      route: '/profile',
      color: 'from-purple-500 to-neon-purple'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <TopNavigation />
        
        <div className="container mx-auto px-6 py-12">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-neon-aqua via-neon-purple to-neon-coral bg-clip-text text-transparent">
              Welcome to DevSynth AI
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your complete AI productivity suite for modern development. Choose a tool to get started.
            </p>
          </motion.div>

          {/* AI Tools Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">AI Development Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <motion.div
                    key={tool.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group cursor-pointer"
                    onClick={() => navigate(tool.route)}
                  >
                    <Card className="glass-dark border-white/10 backdrop-blur-xl h-full hover:border-white/20 transition-all duration-300 group-hover:shadow-2xl">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-neon-aqua transition-colors">
                              {tool.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-4">{tool.description}</p>
                        <div className="bg-slate-900/50 rounded-lg p-3 border border-white/5">
                          <p className="text-xs text-gray-400 mb-1">Demo data:</p>
                          <p className="text-sm text-neon-aqua font-mono truncate">{tool.demoData}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="cursor-pointer"
                    onClick={() => navigate(action.route)}
                  >
                    <Card className="glass-dark border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${action.color} flex items-center justify-center mx-auto mb-4`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{action.title}</h3>
                        <p className="text-gray-300">{action.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-dark border-white/10 backdrop-blur-xl text-center">
                <CardContent className="p-6">
                  <Zap className="w-8 h-8 text-neon-aqua mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-white mb-1">Fast</h3>
                  <p className="text-gray-300">Lightning-quick AI responses</p>
                </CardContent>
              </Card>
              <Card className="glass-dark border-white/10 backdrop-blur-xl text-center">
                <CardContent className="p-6">
                  <Brain className="w-8 h-8 text-neon-purple mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-white mb-1">Smart</h3>
                  <p className="text-gray-300">Advanced AI algorithms</p>
                </CardContent>
              </Card>
              <Card className="glass-dark border-white/10 backdrop-blur-xl text-center">
                <CardContent className="p-6">
                  <BarChart3 className="w-8 h-8 text-neon-green mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-white mb-1">Productive</h3>
                  <p className="text-gray-300">Boost your development speed</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
