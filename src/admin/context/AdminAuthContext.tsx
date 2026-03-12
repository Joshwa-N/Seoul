import { createContext, useContext, useState, type ReactNode } from 'react';
import { adminLogin, adminLogout, getAdminSession } from '@/lib/store';

interface AdminSession { id: string; name: string; role: string; }
interface AdminAuthContextType {
  session: AdminSession | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(() => getAdminSession());

  const login = (email: string, password: string) => {
    const user = adminLogin(email, password);
    if (user) {
      setSession({ id: user.id, name: user.name, role: user.role });
      return true;
    }
    return false;
  };

  const logout = () => {
    adminLogout();
    setSession(null);
  };

  return (
    <AdminAuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
