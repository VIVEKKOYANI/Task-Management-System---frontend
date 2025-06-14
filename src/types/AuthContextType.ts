// src/types/AuthContextType.ts

export interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}
