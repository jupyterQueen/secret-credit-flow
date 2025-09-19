import { useState } from "react";
import { ArrowRight, Zap, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoanApplicationFlow from "@/components/LoanApplicationFlow";

interface LoanCardProps {
  title: string;
  apr: string;
  maxAmount: string;
  collateralRatio: string;
  benefits: string[];
  featured?: boolean;
}

const LoanCard = ({ title, apr, maxAmount, collateralRatio, benefits, featured = false }: LoanCardProps) => {
  const [isApplicationFlowOpen, setIsApplicationFlowOpen] = useState(false);

  return (
    <>
      <Card className={`encrypted-card animate-fade-in-up ${featured ? "glow-primary" : ""}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{title}</CardTitle>
          {featured && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold">
              <Zap className="w-3 h-3" />
              Featured
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-accent">{apr}</div>
            <div className="text-xs text-muted-foreground">APR</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{maxAmount}</div>
            <div className="text-xs text-muted-foreground">Max Amount</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success">{collateralRatio}</div>
            <div className="text-xs text-muted-foreground">Collateral</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            Privacy Features
          </div>
          <ul className="space-y-1">
            {benefits.map((benefit, index) => (
              <li key={index} className="text-sm text-foreground flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary"></div>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <Button 
          className="w-full wallet-connect gap-2"
          onClick={() => setIsApplicationFlowOpen(true)}
        >
          Apply for Loan
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>

    <LoanApplicationFlow
      isOpen={isApplicationFlowOpen}
      onClose={() => setIsApplicationFlowOpen(false)}
      loanType={title}
      apr={apr}
    />
  </>
  );
};

export default LoanCard;