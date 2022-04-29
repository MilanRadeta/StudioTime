import { useEffect } from "react";
import { useStudioContext } from "../contexts/StudioContext";
import { StudioListItem } from "./StudioListItem";

export const StudioList = () => {
    const { studios, loadStudios } = useStudioContext();
    useEffect(() => loadStudios(), [loadStudios]);
    return <>
        <h1>Studios</h1>
        {studios.map(s => <StudioListItem key={s.uid} studio={s}></StudioListItem>)}
    </>;
}