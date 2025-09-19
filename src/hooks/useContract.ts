import { useContract, useContractWrite, useContractRead } from 'wagmi';
import { useState } from 'react';

// Contract ABI - this would be generated from the compiled contract
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "_verifier", "type": "address"}
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "profileId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "borrower", "type": "address"}
    ],
    "name": "CreditProfileCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "applicationId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "applicant", "type": "address"}
    ],
    "name": "LoanApplicationSubmitted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "loanId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "borrower", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "lender", "type": "address"}
    ],
    "name": "LoanApproved",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "profileId", "type": "uint256"}
    ],
    "name": "getCreditProfileInfo",
    "outputs": [
      {"internalType": "uint8", "name": "creditScore", "type": "uint8"},
      {"internalType": "uint8", "name": "riskLevel", "type": "uint8"},
      {"internalType": "uint8", "name": "collateralRatio", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "address", "name": "borrower", "type": "address"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "loanId", "type": "uint256"}
    ],
    "name": "getLoanInfo",
    "outputs": [
      {"internalType": "uint8", "name": "principalAmount", "type": "uint8"},
      {"internalType": "uint8", "name": "interestRate", "type": "uint8"},
      {"internalType": "uint8", "name": "remainingBalance", "type": "uint8"},
      {"internalType": "uint8", "name": "monthlyPayment", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isDefaulted", "type": "bool"},
      {"internalType": "address", "name": "borrower", "type": "address"},
      {"internalType": "address", "name": "lender", "type": "address"},
      {"internalType": "uint256", "name": "startDate", "type": "uint256"},
      {"internalType": "uint256", "name": "endDate", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Contract address - this would be set after deployment
const CONTRACT_ADDRESS = process.env.VITE_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";

export const useSecretCreditFlow = () => {
  const { data: contract } = useContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
  });

  return contract;
};

export const useCreateCreditProfile = () => {
  const { write, isLoading, error } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'createCreditProfile',
  });

  return { createProfile: write, isLoading, error };
};

export const useSubmitLoanApplication = () => {
  const { write, isLoading, error } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'submitLoanApplication',
  });

  return { submitApplication: write, isLoading, error };
};

export const useGetCreditProfile = (profileId: number) => {
  const { data, isLoading, error } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getCreditProfileInfo',
    args: [profileId],
  });

  return { profile: data, isLoading, error };
};

export const useGetLoanInfo = (loanId: number) => {
  const { data, isLoading, error } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getLoanInfo',
    args: [loanId],
  });

  return { loan: data, isLoading, error };
};
