
const LoadingState = ({ module }: { module: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-neon-blue/20 rounded-full animate-spin">
          <div className="absolute inset-0 border-4 border-transparent border-t-neon-blue rounded-full animate-spin"></div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-xl font-semibold mb-2">Processing with AI...</h3>
        <p className="text-muted-foreground">
          {module === 'stackwizard' && 'Analyzing project requirements and generating tech stack...'}
          {module === 'promptrefiner' && 'Enhancing your prompt with AI suggestions...'}
          {module === 'codelens' && 'Scanning code for complexity and bottlenecks...'}
          {module === 'sqldoctor' && 'Optimizing SQL query performance...'}
          {module === 'testcasegen' && 'Generating comprehensive test cases...'}
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
