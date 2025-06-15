
import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import StackWizard from "@/components/modules/StackWizard";
import PromptRefiner from "@/components/modules/PromptRefiner";
import CodeLens from "@/components/modules/CodeLens";
import SQLDoctor from "@/components/modules/SQLDoctor";
import TestCaseGen from "@/components/modules/TestCaseGen";
import FloatingGeometry from "@/components/3D/FloatingGeometry";
import FloatingOrb from "@/components/3D/FloatingOrb";
import { ModuleTransition } from "@/components/motion/PageTransition";
import PageTransition from "@/components/motion/PageTransition";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [activeModule, setActiveModule] = useState("stackwizard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isModuleChanging, setIsModuleChanging] = useState(false);

  // Handle navigation state for SQL Doctor
  useEffect(() => {
    if (location.state?.activeModule) {
      handleModuleChange(location.state.activeModule);
    }
  }, [location.state]);

  const handleModuleChange = (newModule: string) => {
    if (newModule !== activeModule) {
      setIsModuleChanging(true);
      
      // Brief delay to show transition effect
      setTimeout(() => {
        setActiveModule(newModule);
        setIsModuleChanging(false);
      }, 200);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="relative">
          <motion.div 
            className="w-20 h-20 border-4 border-orange-300/30 border-t-orange-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-orange-300 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    );
  }

  if (!user) {
    window.location.href = '/login';
    return null;
  }

  const renderModule = () => {
    const modules = {
      stackwizard: <StackWizard />,
      promptrefiner: <PromptRefiner />,
      codelens: <CodeLens />,
      sqldoctor: <SQLDoctor />,
      testcasegen: <TestCaseGen />,
    };
    
    return modules[activeModule as keyof typeof modules] || <StackWizard />;
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-zinc-900 text-white">
        {/* 3D Background */}
        <FloatingGeometry />
        
        {/* Floating Orb */}
        <FloatingOrb />

        {/* Background Pattern */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-zinc-900 to-orange-500/5"></div>
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

        <div className="relative z-10 flex h-screen">
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <Sidebar 
              activeModule={activeModule} 
              onModuleChange={handleModuleChange}
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
          </motion.div>
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <TopNav activeModule={activeModule} />
            </motion.div>
            
            <div className="flex-1 p-8 overflow-auto">
              <div className="max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                  {isModuleChanging ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center justify-center h-96"
                    >
                      <div className="relative">
                        <motion.div 
                          className="w-16 h-16 border-4 border-orange-300/30 border-t-orange-400 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div 
                          className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-orange-300 rounded-full"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <ModuleTransition moduleKey={activeModule}>
                      <motion.div
                        className="relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                      >
                        {/* Module Container with Clean Dark Theme */}
                        <motion.div
                          className="relative p-8 rounded-lg bg-zinc-800 border border-zinc-700 shadow-lg"
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          whileHover={{
                            boxShadow: "0 25px 50px rgba(251, 146, 60, 0.1)"
                          }}
                        >
                          {/* Content */}
                          <div className="relative z-10">
                            {renderModule()}
                          </div>
                        </motion.div>
                      </motion.div>
                    </ModuleTransition>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
