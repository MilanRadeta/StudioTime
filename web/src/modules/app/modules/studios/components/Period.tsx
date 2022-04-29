import { PeriodDto } from "../../../../shared/model/PeriodDto";

type PeriodProps = {
    period: PeriodDto
};

export const Period = ({ period }: PeriodProps) => {
    return <span>{period.from} - {period.to}</span>
}