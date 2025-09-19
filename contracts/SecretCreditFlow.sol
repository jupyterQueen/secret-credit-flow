// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecretCreditFlow is SepoliaConfig {
    using FHE for *;
    
    struct CreditProfile {
        euint32 creditScore;
        euint32 riskLevel;
        euint32 collateralRatio;
        euint32 loanAmount;
        euint32 repaymentPeriod;
        bool isActive;
        bool isVerified;
        address borrower;
        uint256 createdAt;
        uint256 updatedAt;
    }
    
    struct LoanApplication {
        euint32 applicationId;
        euint32 requestedAmount;
        euint32 creditScore;
        euint32 riskAssessment;
        bool isApproved;
        bool isProcessed;
        address applicant;
        uint256 timestamp;
    }
    
    struct Loan {
        euint32 loanId;
        euint32 principalAmount;
        euint32 interestRate;
        euint32 remainingBalance;
        euint32 monthlyPayment;
        bool isActive;
        bool isDefaulted;
        address borrower;
        address lender;
        uint256 startDate;
        uint256 endDate;
    }
    
    mapping(uint256 => CreditProfile) public creditProfiles;
    mapping(uint256 => LoanApplication) public loanApplications;
    mapping(uint256 => Loan) public loans;
    mapping(address => uint256[]) public borrowerLoans;
    mapping(address => uint256[]) public lenderLoans;
    mapping(address => euint32) public borrowerReputation;
    mapping(address => euint32) public lenderReputation;
    
    uint256 public profileCounter;
    uint256 public applicationCounter;
    uint256 public loanCounter;
    
    address public owner;
    address public verifier;
    
    event CreditProfileCreated(uint256 indexed profileId, address indexed borrower);
    event LoanApplicationSubmitted(uint256 indexed applicationId, address indexed applicant);
    event LoanApproved(uint256 indexed loanId, address indexed borrower, address indexed lender);
    event LoanRepayment(uint256 indexed loanId, uint32 amount);
    event LoanDefaulted(uint256 indexed loanId, address indexed borrower);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createCreditProfile(
        externalEuint32 creditScore,
        externalEuint32 riskLevel,
        externalEuint32 collateralRatio,
        bytes calldata inputProof
    ) public returns (uint256) {
        uint256 profileId = profileCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalCreditScore = FHE.fromExternal(creditScore, inputProof);
        euint32 internalRiskLevel = FHE.fromExternal(riskLevel, inputProof);
        euint32 internalCollateralRatio = FHE.fromExternal(collateralRatio, inputProof);
        
        creditProfiles[profileId] = CreditProfile({
            creditScore: internalCreditScore,
            riskLevel: internalRiskLevel,
            collateralRatio: internalCollateralRatio,
            loanAmount: FHE.asEuint32(0),
            repaymentPeriod: FHE.asEuint32(0),
            isActive: true,
            isVerified: false,
            borrower: msg.sender,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });
        
        emit CreditProfileCreated(profileId, msg.sender);
        return profileId;
    }
    
    function submitLoanApplication(
        uint256 profileId,
        externalEuint32 requestedAmount,
        externalEuint32 creditScore,
        externalEuint32 riskAssessment,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(creditProfiles[profileId].borrower == msg.sender, "Only profile owner can apply");
        require(creditProfiles[profileId].isActive, "Profile must be active");
        
        uint256 applicationId = applicationCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalRequestedAmount = FHE.fromExternal(requestedAmount, inputProof);
        euint32 internalCreditScore = FHE.fromExternal(creditScore, inputProof);
        euint32 internalRiskAssessment = FHE.fromExternal(riskAssessment, inputProof);
        
        loanApplications[applicationId] = LoanApplication({
            applicationId: FHE.asEuint32(0), // Will be set properly later
            requestedAmount: internalRequestedAmount,
            creditScore: internalCreditScore,
            riskAssessment: internalRiskAssessment,
            isApproved: false,
            isProcessed: false,
            applicant: msg.sender,
            timestamp: block.timestamp
        });
        
        emit LoanApplicationSubmitted(applicationId, msg.sender);
        return applicationId;
    }
    
    function processLoanApplication(
        uint256 applicationId,
        bool approved,
        euint32 interestRate,
        euint32 loanAmount
    ) public {
        require(msg.sender == verifier, "Only verifier can process applications");
        require(!loanApplications[applicationId].isProcessed, "Application already processed");
        
        loanApplications[applicationId].isApproved = approved;
        loanApplications[applicationId].isProcessed = true;
        
        if (approved) {
            // Create loan
            uint256 loanId = loanCounter++;
            address borrower = loanApplications[applicationId].applicant;
            
            loans[loanId] = Loan({
                loanId: FHE.asEuint32(0), // Will be set properly later
                principalAmount: loanAmount,
                interestRate: interestRate,
                remainingBalance: loanAmount,
                monthlyPayment: FHE.asEuint32(0), // Will be calculated off-chain
                isActive: true,
                isDefaulted: false,
                borrower: borrower,
                lender: address(this), // Contract acts as lender
                startDate: block.timestamp,
                endDate: block.timestamp + 365 days // 1 year default
            });
            
            borrowerLoans[borrower].push(loanId);
            lenderLoans[address(this)].push(loanId);
            
            emit LoanApproved(loanId, borrower, address(this));
        }
    }
    
    function makeRepayment(
        uint256 loanId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public {
        require(loans[loanId].borrower == msg.sender, "Only borrower can make repayment");
        require(loans[loanId].isActive, "Loan must be active");
        require(!loans[loanId].isDefaulted, "Loan is defaulted");
        
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Update remaining balance using FHE operations
        loans[loanId].remainingBalance = FHE.sub(loans[loanId].remainingBalance, internalAmount);
        
        // Check if loan is fully paid using FHE comparison
        ebool isFullyPaid = FHE.le(loans[loanId].remainingBalance, FHE.asEuint32(0));
        
        // Update loan status based on encrypted comparison
        if (FHE.decrypt(isFullyPaid)) {
            loans[loanId].isActive = false;
        }
        
        // Update borrower reputation based on payment
        euint32 currentReputation = borrowerReputation[msg.sender];
        euint32 reputationIncrease = FHE.asEuint32(10); // Reward for payment
        borrowerReputation[msg.sender] = FHE.add(currentReputation, reputationIncrease);
        
        emit LoanRepayment(loanId, 0); // Amount will be decrypted off-chain
    }
    
    function markLoanDefaulted(uint256 loanId) public {
        require(msg.sender == verifier, "Only verifier can mark default");
        require(loans[loanId].isActive, "Loan must be active");
        
        loans[loanId].isDefaulted = true;
        loans[loanId].isActive = false;
        
        emit LoanDefaulted(loanId, loans[loanId].borrower);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Determine if user is borrower or lender based on context
        if (borrowerLoans[user].length > 0) {
            borrowerReputation[user] = reputation;
        } else {
            lenderReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getCreditProfileInfo(uint256 profileId) public view returns (
        uint8 creditScore,
        uint8 riskLevel,
        uint8 collateralRatio,
        bool isActive,
        bool isVerified,
        address borrower,
        uint256 createdAt
    ) {
        CreditProfile storage profile = creditProfiles[profileId];
        return (
            0, // FHE.decrypt(profile.creditScore) - will be decrypted off-chain
            0, // FHE.decrypt(profile.riskLevel) - will be decrypted off-chain
            0, // FHE.decrypt(profile.collateralRatio) - will be decrypted off-chain
            profile.isActive,
            profile.isVerified,
            profile.borrower,
            profile.createdAt
        );
    }
    
    function getLoanApplicationInfo(uint256 applicationId) public view returns (
        uint8 requestedAmount,
        uint8 creditScore,
        uint8 riskAssessment,
        bool isApproved,
        bool isProcessed,
        address applicant,
        uint256 timestamp
    ) {
        LoanApplication storage application = loanApplications[applicationId];
        return (
            0, // FHE.decrypt(application.requestedAmount) - will be decrypted off-chain
            0, // FHE.decrypt(application.creditScore) - will be decrypted off-chain
            0, // FHE.decrypt(application.riskAssessment) - will be decrypted off-chain
            application.isApproved,
            application.isProcessed,
            application.applicant,
            application.timestamp
        );
    }
    
    function getLoanInfo(uint256 loanId) public view returns (
        uint8 principalAmount,
        uint8 interestRate,
        uint8 remainingBalance,
        uint8 monthlyPayment,
        bool isActive,
        bool isDefaulted,
        address borrower,
        address lender,
        uint256 startDate,
        uint256 endDate
    ) {
        Loan storage loan = loans[loanId];
        return (
            0, // FHE.decrypt(loan.principalAmount) - will be decrypted off-chain
            0, // FHE.decrypt(loan.interestRate) - will be decrypted off-chain
            0, // FHE.decrypt(loan.remainingBalance) - will be decrypted off-chain
            0, // FHE.decrypt(loan.monthlyPayment) - will be decrypted off-chain
            loan.isActive,
            loan.isDefaulted,
            loan.borrower,
            loan.lender,
            loan.startDate,
            loan.endDate
        );
    }
    
    function getBorrowerReputation(address borrower) public view returns (uint8) {
        return 0; // FHE.decrypt(borrowerReputation[borrower]) - will be decrypted off-chain
    }
    
    function getLenderReputation(address lender) public view returns (uint8) {
        return 0; // FHE.decrypt(lenderReputation[lender]) - will be decrypted off-chain
    }
    
    function getBorrowerLoans(address borrower) public view returns (uint256[] memory) {
        return borrowerLoans[borrower];
    }
    
    function getLenderLoans(address lender) public view returns (uint256[] memory) {
        return lenderLoans[lender];
    }
}
