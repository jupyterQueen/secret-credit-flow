import { Zap, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EncryptedScorecardProps {
  title: string;
  encryptedValue: string;
  decryptedValue: string;
  scoreType: "credit" | "risk" | "collateral";
}

const EncryptedScorecard = ({ title, encryptedValue, decryptedValue, scoreType }: EncryptedScorecardProps) => {
  const [isDecrypted, setIsDecrypted] = useState(false);

  const getScoreColor = (type: string) => {
    switch (type) {
      case "credit":
        return "text-accent";
      case "risk": 
        return "text-destructive";
      case "collateral":
        return "text-success";
      default:
        return "text-primary";
    }
  };

  return (
    <Card className="encrypted-card animate-fade-in-up">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            {title}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDecrypted(!isDecrypted)}
            className="text-muted-foreground hover:text-primary"
          >
            {isDecrypted ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(scoreType)} ${!isDecrypted ? "encrypted-text" : ""}`}>
              {isDecrypted ? decryptedValue : encryptedValue}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {isDecrypted ? "Decrypted Score" : "Encrypted Data"}
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Privacy Level</span>
              <span className="text-primary">Zero-Knowledge</span>
            </div>
            <div className="credit-meter"></div>
          </div>

          {isDecrypted && (
            <div className="p-3 rounded-lg bg-success/10 border border-success/20">
              <p className="text-xs text-success">
                ✓ Score verified by smart contract
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EncryptedScorecard;