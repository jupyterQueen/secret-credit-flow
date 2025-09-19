# Vercel Deployment Guide

Complete guide for deploying Secret Credit Flow to Vercel platform.

## Prerequisites

- GitHub account with repository access
- Vercel account (free tier available)
- Node.js 18+ installed locally
- Web3 wallet for testing

## Step 1: Connect Repository

1. **Login to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub account

2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your repository from the list
   - Click "Import"

## Step 2: Configure Build Settings

### Framework Configuration
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Root Directory
- Leave as default (repository root)

## Step 3: Environment Variables

Add the following environment variables in Vercel dashboard:

### Required Variables

```env
VITE_CHAIN_ID=11155111
VITE_RPC_URL=your_sepolia_rpc_url
VITE_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
VITE_INFURA_API_KEY=your_infura_api_key
```

### Optional Variables

```env
VITE_CONTRACT_ADDRESS=your_deployed_contract_address
VITE_APP_NAME=Secret Credit Flow
VITE_APP_DESCRIPTION=Privacy-first DeFi lending platform
```

## Step 4: Deployment Configuration

### Build Settings
- **Node.js Version**: `18.x`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Deployment Settings
- **Production Branch**: `main`
- **Preview Branches**: `develop`, `staging`
- **Auto-deploy**: `Enabled`

## Step 5: Deploy Application

### Initial Deployment
1. Click "Deploy" in Vercel dashboard
2. Wait for build completion (2-3 minutes)
3. Access your app at `https://your-project-name.vercel.app`

### Custom Domain (Optional)
1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed

## Step 6: Post-Deployment

### Contract Integration
1. Deploy smart contracts to Sepolia testnet
2. Update `VITE_CONTRACT_ADDRESS` with actual address
3. Verify contract ABI matches deployed contract

### Wallet Configuration
1. Ensure WalletConnect project ID is active
2. Test wallet connections
3. Verify all wallet providers work correctly

## Step 7: Testing

### Application Testing
1. Visit deployed URL
2. Connect Web3 wallet
3. Test credit profile creation
4. Verify loan application flow
5. Check all features functionality

### Performance Testing
1. Test on different devices
2. Check loading times
3. Verify responsive design
4. Test wallet connectivity

## Troubleshooting

### Common Issues

**Build Failures**
- Verify all dependencies in package.json
- Check Node.js version (18+)
- Ensure build command is correct

**Environment Variables**
- Double-check variable names
- Verify no typos
- Restart deployment after changes

**Wallet Connection Issues**
- Verify WalletConnect project ID
- Check project ID is active
- Test with different wallets

**Contract Interaction Issues**
- Ensure contract address is correct
- Verify contract is deployed
- Check ABI matches deployed contract

### Performance Optimization

**Build Optimization**
- Enable Vercel automatic optimizations
- Use production build commands
- Consider edge functions

**Caching**
- Static assets auto-cached
- Configure API route caching
- Optimize image loading

## Monitoring

### Analytics
- Enable Vercel Analytics
- Monitor performance metrics
- Track user behavior

### Error Tracking
- Set up error monitoring
- Track console errors
- Monitor user feedback

## Security

### Environment Security
- Never commit sensitive keys
- Use Vercel encryption
- Rotate keys regularly

### HTTPS
- Automatic HTTPS certificates
- Ensure all API calls use HTTPS
- Configure security headers

## Maintenance

### Updates
- Regular dependency updates
- Security vulnerability monitoring
- Test in preview environments

### Backup
- Repository backed up on GitHub
- Backup environment configurations
- Document deployment procedures

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [WalletConnect Documentation](https://docs.walletconnect.com/)
- [Wagmi Documentation](https://wagmi.sh/)

---

**Note**: Ensure smart contracts are deployed before setting contract addresses in environment variables.