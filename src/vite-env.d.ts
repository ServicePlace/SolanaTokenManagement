/// <reference types="vite/client" />

interface Window {
  solana?: {
    isPhantom?: boolean;
    connect(): Promise<{ publicKey: any }>;
    publicKey?: any;
    secretKey?: Uint8Array;
    isConnected?: boolean;
  };
}