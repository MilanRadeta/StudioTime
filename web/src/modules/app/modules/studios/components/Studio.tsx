import { StudioDto } from "../model/StudioDto";

type StudioProps = {
    studio: StudioDto
}

export const Studio = ({ studio }: StudioProps) => {
    return <h2 key={studio.uid}>{studio.name}</h2>;
}