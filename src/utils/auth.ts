import { AES } from 'crypto-js';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key';

export const encryptPassword = (password: string): string => {
  return AES.encrypt(password, SECRET_KEY).toString();
};

export const decryptPassword = (encrypted: string): string => {
  const bytes = AES.decrypt(encrypted, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const validatePassword = (password: string): boolean => {
  return decryptPassword(import.meta.env.VITE_ADMIN_PASSWORD) === password;
};