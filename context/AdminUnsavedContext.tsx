"use client";

import { createContext, useContext, useState } from "react";

interface AdminUnsavedContextValue {
  isDirty: boolean;
  setIsDirty: (dirty: boolean) => void;
}

const AdminUnsavedContext = createContext<AdminUnsavedContextValue>({
  isDirty: false,
  setIsDirty: () => {},
});

export function AdminUnsavedProvider({ children }: { children: React.ReactNode }) {
  const [isDirty, setIsDirty] = useState(false);
  return (
    <AdminUnsavedContext.Provider value={{ isDirty, setIsDirty }}>
      {children}
    </AdminUnsavedContext.Provider>
  );
}

export function useAdminUnsaved() {
  return useContext(AdminUnsavedContext);
}
