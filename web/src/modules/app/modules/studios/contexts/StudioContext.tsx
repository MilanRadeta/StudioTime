import React, { useCallback, useMemo } from "react";
import { useHttp } from "../../../../shared/http/HTTP";
import { StudioDto } from "../model/StudioDto";

interface StudioContextType {
  studios: StudioDto[];
  studio?: StudioDto;
  loadStudios: () => void;
  loadStudio: (id: string) => void;
}

export const StudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [studios, setStudios] = React.useState<StudioDto[]>([]);
  const [studio, setStudio] = React.useState<StudioDto | undefined>(undefined);

  const http = useHttp();
  const loadStudios = useCallback(() => {
    http<StudioDto[]>('studio').then(res => setStudios(res.data));

  }, [http, setStudios])

  const loadStudio = useCallback((id: string) => {
    http<StudioDto>(`studio/${id}`).then(res => setStudio(res.data));
  }, [http, setStudio])

  const value = useMemo(() =>
    ({ studios, studio, loadStudios, loadStudio }),
    [studios, studio, loadStudios, loadStudio]);

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

export const StudioContext = React.createContext<StudioContextType>(null!);
export const useStudio = () => React.useContext(StudioContext);