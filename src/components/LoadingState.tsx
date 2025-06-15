
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  module: string;
}

const LoadingState = ({ module }: LoadingStateProps) => {
  const moduleNames = {
    stackwizard: "StackWizard+",
    promptrefiner: "PromptRefiner", 
    codelens: "CodeLens",
    sqldoctor: "SQLDoctor",
    testcasegen: "TestCaseGen"
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-neon-aqua/20 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-neon-aqua rounded-full animate-spin"></div>
        </div>
        <Loader2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-neon-aqua animate-spin" />
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold font-sora gradient-text animate-pulse-glow">
          {moduleNames[module as keyof typeof moduleNames]} is analyzing...
        </h3>
        <p className="text-muted-foreground animate-pulse">
          Please wait while AI processes your request
        </p>
      </div>
      
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-neon-aqua rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-neon-coral rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-neon-pink rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default LoadingState;
