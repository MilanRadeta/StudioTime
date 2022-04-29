import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStudio } from "../contexts/StudioContext";

export const StudioProfile = () => {
    const { id = '' } = useParams();
    const { studio, loadStudio } = useStudio();

    useEffect(() => loadStudio(id), [id, loadStudio]);
    return <>
        <h1>{studio?.name}</h1>
    </>;
}