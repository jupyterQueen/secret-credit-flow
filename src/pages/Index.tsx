import { useState } from "react";
import Logo from "@/components/Logo";
import WalletConnect from "@/components/WalletConnect";
import EncryptedScorecard from "@/components/EncryptedScorecard";
import LoanCard from "@/components/LoanCard";
import CreditMeter from "@/components/CreditMeter";
import PrivateScoreFlow from "@/components/PrivateScoreFlow";
import { Button } from "@/components/ui/button";
import { ChevronRight, Lock, Zap, TrendingUp } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [isPrivateScoreFlowOpen, setIsPrivateScoreFlowOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <nav className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => setSelectedTab("dashboard")}
                className={`text-sm font-medium transition-colors ${
                  selectedTab === "dashboard" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setSelectedTab("loans")}
                className={`text-sm font-medium transition-colors ${
                  selectedTab === "loans" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Loans
              </button>
              <button 
                onClick={() => setSelectedTab("analytics")}
                className={`text-sm font-medium transition-colors ${
                  selectedTab === "analytics" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Analytics
              </button>
            </nav>
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-background/80"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient-primary">Fair Lending</span><br />
              <span className="text-foreground">with Private Scores</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Revolutionary DeFi lending platform where your credit metrics are encrypted and only revealed to smart contracts for fair loan terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="wallet-connect gap-2"
                onClick={() => setIsPrivateScoreFlowOpen(true)}
              >
                <Lock className="w-4 h-4" />
                Get Your Private Score
              </Button>
              <Button variant="outline" className="border-glow gap-2">
                Learn More
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {selectedTab === "dashboard" && (
          <div className="space-y-12">
            {/* Encrypted Scorecards */}
            <section>
              <h2 className="text-3xl font-bold mb-8 text-center">Your Encrypted Credit Profile</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <EncryptedScorecard
                  title="Credit Score"
                  encryptedValue="████████"
                  decryptedValue="742"
                  scoreType="credit"
                />
                <EncryptedScorecard
                  title="Risk Assessment"
                  encryptedValue="██████"
                  decryptedValue="Low"
                  scoreType="risk"
                />
                <EncryptedScorecard
                  title="Collateral Power"
                  encryptedValue="████████"
                  decryptedValue="85%"
                  scoreType="collateral"
                />
              </div>
            </section>

            {/* Loan Options */}
            <section>
              <h2 className="text-3xl font-bold mb-8 text-center">Available Loan Products</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <LoanCard
                  title="Premium Loan"
                  apr="5.2%"
                  maxAmount="500K"
                  collateralRatio="150%"
                  benefits={["Zero-knowledge verification", "Instant approval", "Flexible terms"]}
                  featured={true}
                />
                <LoanCard
                  title="Standard Loan"
                  apr="7.8%"
                  maxAmount="100K"
                  collateralRatio="200%"
                  benefits={["Private scoring", "Auto-liquidation protection", "24/7 support"]}
                />
                <LoanCard
                  title="Starter Loan"
                  apr="12.5%"
                  maxAmount="25K"
                  collateralRatio="300%"
                  benefits={["Build credit history", "Lower requirements", "Educational resources"]}
                />
              </div>
            </section>
          </div>
        )}

        {selectedTab === "loans" && (
          <div className="text-center py-20">
            <Zap className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Loan Management</h2>
            <p className="text-muted-foreground">Connect your wallet to view active loans and payment history.</p>
          </div>
        )}

        {selectedTab === "analytics" && (
          <div className="text-center py-20">
            <TrendingUp className="w-16 h-16 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Credit Analytics</h2>
            <p className="text-muted-foreground">Detailed insights into your credit performance and market trends.</p>
          </div>
        )}
      </main>

      {/* Footer with Animated Credit Meters */}
      <footer className="border-t border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <CreditMeter
              label="Credit Utilization"
              value={35}
              maxValue={100}
              type="credit"
              encrypted={false}
            />
            <CreditMeter
              label="Risk Score"
              value={8}
              maxValue={10}
              type="risk"
              encrypted={true}
            />
            <CreditMeter
              label="DeFi Activity"
              value={456}
              maxValue={1000}
              type="activity"
              encrypted={false}
            />
          </div>
          
          <div className="border-t border-border/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <Logo />
              <div className="text-sm text-muted-foreground mt-4 md:mt-0">
                © 2024 PrivateScore. Powered by zero-knowledge proofs.
              </div>
            </div>
          </div>
        </div>
      </footer>

      <PrivateScoreFlow 
        isOpen={isPrivateScoreFlowOpen}
        onClose={() => setIsPrivateScoreFlowOpen(false)}
      />
    </div>
  );
};

export default Index;
