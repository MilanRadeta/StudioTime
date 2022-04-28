import React, { useCallback, useEffect } from "react";
import { useHttp } from "../../../../shared/http/HTTP";
import { StudioDto } from "../model/StudioDto";

interface StudioContextType {
  studios: StudioDto[];
  loadStudios: () => void;
}

export const StudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [studios, setStudios] = React.useState<StudioDto[]>([]);
  const http = useHttp();
  const loadStudios = useCallback(() => {
    http<StudioDto[]>('studio').then(res => setStudios(res.data));

  }, [http, setStudios])

  useEffect(() => {
    loadStudios();
  }, [loadStudios])

  const value = { studios, loadStudios };

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

export const StudioContext = React.createContext<StudioContextType>(null!);
export const useStudio = () => React.useContext(StudioContext);