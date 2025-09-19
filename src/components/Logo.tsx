import { Zap, TrendingUp } from "lucide-react";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative logo-glow">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
          <Zap className="w-5 h-5 text-primary" />
          <TrendingUp className="w-3 h-3 text-accent absolute -bottom-1 -right-1" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gradient-primary">Secret Credit</span>
        <span className="text-xs text-muted-foreground">FHE Powered</span>
      </div>
    </div>
  );
};

export default Logo;