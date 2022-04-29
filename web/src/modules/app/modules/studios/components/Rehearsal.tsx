import { useCallback } from "react";
import { RehearsalDto } from "../../../../shared/model/RehearsalDto";
import { Period } from "./Period";

type RehearsalProps = {
    rehearsal: RehearsalDto;
    onClick: (rehearsal: RehearsalDto) => void;
};

export const Rehearsal = ({ rehearsal, onClick }: RehearsalProps) => {
    const onRootClick = useCallback(() => onClick(rehearsal), [rehearsal, onClick]);
    return <div onClick={onRootClick}>
        Room: {rehearsal.room},
        <Period period={rehearsal.period}></Period>
    </div>
}