
import { useState, useEffect } from "react";
import { Settings } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="glass-dark rounded-xl p-3 hover:scale-110 transition-all duration-300 neon-glow"
    >
      <Settings className="w-5 h-5 text-neon-blue animate-glow" />
    </button>
  );
};

export default ThemeToggle;
