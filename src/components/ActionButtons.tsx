
import { Copy, Download, FileText } from "lucide-react";

const ActionButtons = () => {
  return (
    <div className="flex gap-3">
      <button className="glass-dark rounded-xl px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all duration-300 neon-glow btn-glow">
        <FileText className="w-4 h-4 text-neon-aqua animate-glow" />
        <span className="text-sm font-medium">Export PDF</span>
      </button>
      <button className="glass-dark rounded-xl px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all duration-300 neon-glow btn-glow">
        <Copy className="w-4 h-4 text-neon-green animate-glow" />
        <span className="text-sm font-medium">Copy Code</span>
      </button>
      <button className="glass-dark rounded-xl px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all duration-300 neon-glow btn-glow">
        <Download className="w-4 h-4 text-neon-purple animate-glow" />
        <span className="text-sm font-medium">Download</span>
      </button>
    </div>
  );
};

export default ActionButtons;
