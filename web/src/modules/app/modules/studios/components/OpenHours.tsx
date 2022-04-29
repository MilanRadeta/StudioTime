import { DayOfWeek } from "../../../../shared/model/DayOfWeek";
import { OpenHoursDto } from "../../../../shared/model/OpenHoursDto";

type OpenHoursProps = {
    openHours: OpenHoursDto
}

const DAY_OF_WEEK: Record<DayOfWeek, string> = {
    [DayOfWeek.SUNDAY]: 'Sunday',
    [DayOfWeek.MONDAY]: 'Monday',
    [DayOfWeek.TUESDAY]: 'Tuesday',
    [DayOfWeek.WEDNESDAY]: 'Wednesday',
    [DayOfWeek.THURSDAY]: 'Thursday',
    [DayOfWeek.FRIDAY]: 'Friday',
    [DayOfWeek.SATURDAY]: 'Saturday',
};

export const OpenHours = ({ openHours }: OpenHoursProps) => {
    const { dayOfWeek, period } = openHours;
    return <div>
        {DAY_OF_WEEK[dayOfWeek]} {period.from} - {period.to}
    </div>
}