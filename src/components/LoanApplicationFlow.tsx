import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, DollarSign, Calendar, CheckCircle, Zap } from "lucide-react";

interface LoanApplicationFlowProps {
  isOpen: boolean;
  onClose: () => void;
  loanType: string;
  apr: string;
}

const LoanApplicationFlow = ({ isOpen, onClose, loanType, apr }: LoanApplicationFlowProps) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");

  const handleNextStep = () => {
    if (step === 4) {
      setIsProcessing(true);
      setTimeout(() => {
        setStep(5);
        setIsProcessing(false);
      }, 2500);
    } else {
      setStep(step + 1);
    }
  };

  const handleClose = () => {
    setStep(1);
    setIsProcessing(false);
    setLoanAmount("");
    setLoanPurpose("");
    onClose();
  };

  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Zap className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Loan Application</h3>
              <p className="text-muted-foreground">
                Apply for {loanType} with {apr} APR using your private credit score.
              </p>
            </div>
            <div className="encrypted-card p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Loan Type</span>
                <span className="font-semibold">{loanType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Interest Rate</span>
                <span className="font-semibold text-accent">{apr} APR</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Credit Score</span>
                <span className="encrypted-text">████</span>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <DollarSign className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Loan Details</h3>
              <p className="text-muted-foreground">
                Specify your loan amount and intended use.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="loanAmount">Loan Amount (USD)</Label>
                <Input 
                  id="loanAmount" 
                  placeholder="Enter amount" 
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="loanPurpose">Loan Purpose</Label>
                <Select value={loanPurpose} onValueChange={setLoanPurpose}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business">Business Investment</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="personal">Personal Use</SelectItem>
                    <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Calendar className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Loan Terms</h3>
              <p className="text-muted-foreground">
                Choose your preferred repayment schedule.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="term">Loan Term</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select term length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 months</SelectItem>
                    <SelectItem value="24">24 months</SelectItem>
                    <SelectItem value="36">36 months</SelectItem>
                    <SelectItem value="48">48 months</SelectItem>
                    <SelectItem value="60">60 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="collateral">Collateral Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select collateral" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                    <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                    <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                    <SelectItem value="mixed">Mixed Portfolio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Review Application</h3>
              <p className="text-muted-foreground">
                Please review your loan application details.
              </p>
            </div>
            <div className="encrypted-card p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Loan Amount</span>
                <span className="font-semibold">${loanAmount || "0"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Purpose</span>
                <span className="font-semibold">{loanPurpose || "Not specified"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Interest Rate</span>
                <span className="font-semibold text-accent">{apr} APR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Monthly Payment</span>
                <span className="font-semibold">~${Math.round((parseFloat(loanAmount || "0") * 0.08) / 12)}</span>
              </div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
              By proceeding, you agree to our terms and conditions. Your private credit score will be used for loan approval without revealing your personal data.
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 text-center">
            <CheckCircle className="w-16 h-16 text-success mx-auto" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Application Submitted!</h3>
              <p className="text-muted-foreground mb-6">
                Your loan application has been processed using zero-knowledge verification.
              </p>
            </div>
            <div className="encrypted-card p-6 space-y-4">
              <div className="text-lg font-semibold text-success">✓ Approved</div>
              <div className="text-sm text-muted-foreground">Application ID: #LN-2024-{Math.random().toString(36).substr(2, 6).toUpperCase()}</div>
              <div className="text-xs text-muted-foreground">
                Funds will be available in your wallet within 24 hours
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Apply for Loan
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Progress value={(step / 5) * 100} className="w-full" />
          
          {isProcessing ? (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-sm text-muted-foreground">
                Processing your application with zero-knowledge verification...
              </p>
            </div>
          ) : (
            getStepContent()
          )}

          <div className="flex justify-between">
            {step > 1 && step < 5 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <div className="flex-1" />
            {step < 5 ? (
              <Button onClick={handleNextStep} disabled={isProcessing}>
                {step === 4 ? (
                  <>
                    Submit Application
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={handleClose} className="wallet-connect">
                View Loan Dashboard
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoanApplicationFlow;