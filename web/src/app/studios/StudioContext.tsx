import React, { useCallback, useEffect } from "react";
import { useHttp } from "../../http/http";

interface Studio {
  uid: string;
  name: string;
}

interface StudioContextType {
  studios: Studio[];
  loadStudios: () => void;
}


export const StudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [studios, setStudios] = React.useState<Studio[]>([]);
  const http = useHttp();
  const loadStudios = useCallback(() => {
    http<Studio[]>('studio').then(res => setStudios(res.data));

  }, [http, setStudios])

  useEffect(() => {
    loadStudios();
  }, [loadStudios])

  const value = { studios, loadStudios };

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

export const StudioContext = React.createContext<StudioContextType>(null!);
export const useStudio = () => React.useContext(StudioContext);