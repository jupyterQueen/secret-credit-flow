import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Lock, Key, CheckCircle, ArrowRight, ArrowLeft, Database } from "lucide-react";
import { useCreateCreditProfile } from "@/hooks/useContract";
import { useAccount } from "wagmi";

interface PrivateScoreFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivateScoreFlow = ({ isOpen, onClose }: PrivateScoreFlowProps) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    creditScore: 0,
    riskLevel: 0,
    collateralRatio: 0
  });
  
  const { isConnected } = useAccount();
  const { createProfile, isLoading: isCreatingProfile, error: createError } = useCreateCreditProfile();

  const handleNextStep = async () => {
    if (step === 3) {
      if (!isConnected) {
        alert('Please connect your wallet first');
        return;
      }
      
      setIsProcessing(true);
      
      try {
        // Simulate FHE encryption and contract interaction
        // In a real implementation, this would involve FHE encryption
        const mockEncryptedData = {
          creditScore: formData.creditScore,
          riskLevel: formData.riskLevel,
          collateralRatio: formData.collateralRatio
        };
        
        // Call contract to create credit profile
        await createProfile({
          args: [
            mockEncryptedData.creditScore,
            mockEncryptedData.riskLevel,
            mockEncryptedData.collateralRatio,
            '0x' // Mock proof
          ]
        });
        
        setTimeout(() => {
          setStep(4);
          setIsProcessing(false);
        }, 3000);
      } catch (error) {
        console.error('Error creating credit profile:', error);
        setIsProcessing(false);
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleClose = () => {
    setStep(1);
    setIsProcessing(false);
    onClose();
  };

  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Database className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Connect Your Financial Data</h3>
              <p className="text-muted-foreground">
                We'll securely analyze your financial history to generate your private credit score.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-sm">Bank account verification</span>
              </div>
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-sm">Transaction history analysis</span>
              </div>
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-sm">Zero-knowledge encryption</span>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Key className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
              <p className="text-muted-foreground">
                Enter your details to begin the secure verification process.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Database className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Bank Account Connection</h3>
              <p className="text-muted-foreground">
                Connect your bank account for secure financial analysis.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-16 flex flex-col gap-2">
                <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">B</span>
                </div>
                <span className="text-sm">Bank of America</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-2">
                <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">C</span>
                </div>
                <span className="text-sm">Chase</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-2">
                <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">W</span>
                </div>
                <span className="text-sm">Wells Fargo</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-2">
                <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">+</span>
                </div>
                <span className="text-sm">Other Bank</span>
              </Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 text-center">
            <CheckCircle className="w-16 h-16 text-success mx-auto" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Private Score Generated!</h3>
              <p className="text-muted-foreground mb-6">
                Your encrypted credit score has been successfully created and secured.
              </p>
            </div>
            <div className="encrypted-card p-6 space-y-4">
              <div className="text-3xl font-bold text-accent">742</div>
              <div className="text-sm text-muted-foreground">Your Private Credit Score</div>
              <div className="flex items-center justify-center gap-2 text-xs text-success">
                <Lock className="w-3 h-3" />
                Encrypted & Secure
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
            <Lock className="w-5 h-5" />
            Get Your Private Score
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Progress value={(step / 4) * 100} className="w-full" />
          
          {isProcessing ? (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-sm text-muted-foreground">
                Analyzing your financial data securely...
              </p>
            </div>
          ) : (
            getStepContent()
          )}

          <div className="flex justify-between">
            {step > 1 && step < 4 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <div className="flex-1" />
            {step < 4 ? (
              <Button onClick={handleNextStep} disabled={isProcessing}>
                {step === 3 ? (
                  <>
                    Generate Score
                    <Key className="w-4 h-4 ml-2" />
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
                Continue to Dashboard
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrivateScoreFlow;