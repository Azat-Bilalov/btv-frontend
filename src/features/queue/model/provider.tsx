import React from "react";
import QueueStore from "./store";
import { useLocalStore } from "@/shared/lib/hooks";

export const QueueStoreContext = React.createContext<QueueStore | null>(null);

export type QueueStoreProviderProps = {
  children: React.ReactNode;
};

export const QueueStoreProvider = ({ children }: QueueStoreProviderProps) => {
  const queueStore = useLocalStore(() => new QueueStore());

  return (
    <QueueStoreContext.Provider value={queueStore}>
      {children}
    </QueueStoreContext.Provider>
  );
};