import { useStudio } from "../contexts/StudioContext";

export const Studios = () => {
    const { studios } = useStudio();
    return <>
        <h1>Studios</h1>
        {studios.map(s => <h2 key={s.uid}>{s.name}</h2>)}
    </>;
}