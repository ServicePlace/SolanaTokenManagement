import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import { createMint, mintTo, getMint } from '@solana/spl-token';
import type { Token } from '../types';

const SOLANA_NETWORK = 'https://api.devnet.solana.com';

export const connection = new Connection(SOLANA_NETWORK, 'confirmed');

export const connectWallet = async (): Promise<boolean> => {
  try {
    if (!window.solana || !window.solana.isPhantom) {
      throw new Error('Phantom wallet not found! Please install it from https://phantom.app/');
    }
    
    const resp = await window.solana.connect();
    return !!resp.publicKey;
  } catch (error) {
    console.error('Error connecting wallet:', error);
    return false;
  }
};

export const createToken = async (
  name: string,
  symbol: string,
  decimals: number = 9,
  initialSupply: number = 0
): Promise<string> => {
  try {
    if (!window.solana?.publicKey) {
      throw new Error('Wallet not connected');
    }

    const payer = Keypair.generate();
    const mintAuthority = new PublicKey(window.solana.publicKey.toString());

    const mint = await createMint(
      connection,
      payer,
      mintAuthority,
      mintAuthority,
      decimals
    );

    if (initialSupply > 0) {
      const tokenAccount = await mintTo(
        connection,
        payer,
        mint,
        mintAuthority,
        mintAuthority,
        initialSupply * Math.pow(10, decimals)
      );
      console.log('Minted initial supply to:', tokenAccount.toBase58());
    }

    await addTokenMetadata(mint, name, symbol);

    const isVerified = await verifyToken(mint.toBase58());
    if (!isVerified) {
      throw new Error('Token verification failed');
    }

    return mint.toBase58();
  } catch (error) {
    console.error('Error creating token:', error);
    throw error;
  }
};

export const getTokenAccounts = async (): Promise<Token[]> => {
  try {
    if (!window.solana?.publicKey) {
      throw new Error('Wallet not connected');
    }

    const mockTokens: Token[] = [
      {
        mint: 'ExampleMint1111111111111111111111111111111',
        name: 'Example Token',
        symbol: 'EXTKN',
        decimals: 9,
        isMutable: true
      }
    ];

    return mockTokens;
  } catch (error) {
    console.error('Error fetching token accounts:', error);
    return [];
  }
};

export const addTokenMetadata = async (mint: PublicKey, name: string, symbol: string) => {
  console.log(`TODO: Add metadata for mint ${mint.toBase58()} - Name: ${name}, Symbol: ${symbol}`);
};

export const verifyToken = async (mintAddress: string): Promise<boolean> => {
  try {
    const mintPublicKey = new PublicKey(mintAddress);
    await getMint(connection, mintPublicKey);
    return true;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};