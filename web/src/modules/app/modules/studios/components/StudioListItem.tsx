import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../components/App";
import { StudioDto } from "../model/StudioDto";
import { OpenHours } from "./OpenHours";

type StudioProps = {
    studio: StudioDto
}

export const StudioListItem = ({ studio }: StudioProps) => {
    const navigate = useNavigate();
    const { address, name, openHours, rooms } = studio;
    const { city, number, street } = address;
    const goToProfile = useCallback(() => { navigate(`/${APP_ROUTES.STUDIO}/${studio.uid}`) }, [navigate, studio])
    return <div style={{ border: '1px solid black', margin: '1px', display: 'flex', flexDirection: 'column' }} onClick={goToProfile}>
        <div>
            <strong>{name}</strong>
            <div>{`${city}, ${street} ${number}`}</div>
            <div>{`${rooms.length} room${rooms.length === 1 ? '' : 's'}`}</div>
        </div>
        <div>
            {openHours.map((oh, i) => <OpenHours key={i} openHours={oh}></OpenHours>)}
        </div>
    </div>;
}