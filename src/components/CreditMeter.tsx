import { TrendingUp, Activity, DollarSign } from "lucide-react";

interface CreditMeterProps {
  label: string;
  value: number;
  maxValue: number;
  type: "credit" | "risk" | "activity";
  encrypted?: boolean;
}

const CreditMeter = ({ label, value, maxValue, type, encrypted = false }: CreditMeterProps) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  
  const getIcon = () => {
    switch (type) {
      case "credit":
        return <TrendingUp className="w-4 h-4" />;
      case "risk":
        return <Activity className="w-4 h-4" />;
      case "activity":
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const getColor = () => {
    switch (type) {
      case "credit":
        return "text-accent";
      case "risk":
        return "text-destructive";
      case "activity":
        return "text-success";
    }
  };

  return (
    <div className="space-y-3 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={getColor()}>
            {getIcon()}
          </div>
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span className={`text-sm font-bold ${getColor()} ${encrypted ? "encrypted-text" : ""}`}>
          {encrypted ? "***" : value}
        </span>
      </div>
      
      <div className="relative">
        <div className="credit-meter"></div>
        <div 
          className="absolute inset-0 rounded-full transition-all duration-1000 ease-out"
          style={{
            background: `linear-gradient(90deg, ${
              type === "credit" ? "hsl(var(--accent))" :
              type === "risk" ? "hsl(var(--destructive))" :
              "hsl(var(--success))"
            }, hsl(var(--primary)))`,
            width: `${percentage}%`,
            animationDelay: `${Math.random() * 0.5}s`
          }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0</span>
        <span>{maxValue}</span>
      </div>
    </div>
  );
};

export default CreditMeter;