import { useEffect } from "react";
import { useStudio } from "../contexts/StudioContext";
import { StudioListItem } from "./StudioListItem";

export const StudioList = () => {
    const { studios, loadStudios } = useStudio();
    useEffect(() => loadStudios(), [loadStudios]);
    return <>
        <h1>Studios</h1>
        {studios.map(s => <StudioListItem key={s.uid} studio={s}></StudioListItem>)}
    </>;
}