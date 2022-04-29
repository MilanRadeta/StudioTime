import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStudioContext } from "../contexts/StudioContext";
import { OpenHours } from "./OpenHours";
import { StudioRehearsalScheduler } from "./StudioRehearsalScheduler";

export const StudioProfile = () => {
    const { id = '' } = useParams();
    const { studio, loadStudio } = useStudioContext();
    useEffect(() => loadStudio(id), [id, loadStudio]);

    if (!studio) {
        return null;
    }

    const { address, openHours, rooms } = studio;
    const { city, number, street } = address;

    return <>
        <h1>{studio?.name}</h1>
        <div>{`${city}, ${street} ${number}`}</div>
        <div>{`${rooms.length} room${rooms.length === 1 ? '' : 's'}`}</div>
        <div>
            {openHours.map((oh, i) => <OpenHours key={i} openHours={oh}></OpenHours>)}
        </div>
        <StudioRehearsalScheduler></StudioRehearsalScheduler>
    </>;
}