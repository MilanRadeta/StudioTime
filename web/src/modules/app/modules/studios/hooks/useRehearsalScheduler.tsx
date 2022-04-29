import { useEffect, useState } from "react";
import { useHttp } from "../../../../shared/http/HTTP";
import { RehearsalDto } from "../../../../shared/model/RehearsalDto";
import { StudioDto } from "../model/StudioDto";

export const useRehearsalScheduler = (date: Date, room?: string, studio?: StudioDto) => {
    const http = useHttp();
    const [availableRehearsals, setAvailableRehearsals] = useState<RehearsalDto[]>([]);
  
    useEffect(() => {
      if (!studio || !date) {
        setAvailableRehearsals([]);
        return;
      }
      
      let params = `date=${date.getTime()}`;
      if (room) {
        params += `&room=${room}`;
      }

      http<RehearsalDto[]>(`rehearsal/studio/${studio.uid}/available?${params}`)
        .then(res => setAvailableRehearsals(res.data));
    }, [http, studio, date, room, setAvailableRehearsals]);
  
    return { availableRehearsals };
  }