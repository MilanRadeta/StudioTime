import { ChangeEvent, CSSProperties, useCallback, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RehearsalDto } from "../../../../shared/model/RehearsalDto";
import { useStudioContext } from "../contexts/StudioContext";
import { useRehearsalScheduler } from "../hooks/useRehearsalScheduler";
import { Rehearsal } from "./Rehearsal";

const DATE_ISO_FORMAT = "yyyy/MM/dd";
const TIME_FORMAT = "HH:mm";

export const StudioRehearsalScheduler = () => {
    const { studio } = useStudioContext();
    const [date, setDate] = useState<Date>(new Date());
    const [from, setFrom] = useState<Date>(new Date());
    const [to, setTo] = useState<Date>(new Date());
    const [room, setRoom] = useState<string>('');
    const { availableRehearsals } = useRehearsalScheduler(date, room, studio);
    const changeDate = useCallback((callback: (date: Date) => void) => (date: Date) => callback(date), []);
    const changeRoom = useCallback((event: ChangeEvent<HTMLSelectElement>) => setRoom(event.target.value), [setRoom]);
    const chooseAvailableRehearsal = useCallback((rehearsal: RehearsalDto) => {
        from.setHours(parseInt(rehearsal.period.from.split(":")[0], 10));
        from.setMinutes(parseInt(rehearsal.period.from.split(":")[1], 10));
        to.setHours(parseInt(rehearsal.period.to.split(":")[0], 10));
        to.setMinutes(parseInt(rehearsal.period.to.split(":")[1], 10));
        setRoom(rehearsal.room);
        setFrom(from);
        setTo(to);
    }, []);
    const formInputStyle: CSSProperties = useMemo(() => ({ display: 'flex', alignItems: "center" }), []);
    const timePickerProps = useMemo(() => ({
        showTimeSelect: true,
        showTimeSelectOnly: true,
        timeIntervals: 60,
        dateFormat: TIME_FORMAT,
        timeFormat: TIME_FORMAT,
    }), []);

    if (!studio) {
        return null;
    }


    return <div style={{ border: '1px solid black' }}>
        <strong>Schedule a rehearsal</strong>
        <div style={formInputStyle}>
            <label>Date:</label>
            <DatePicker selected={date} onChange={changeDate(setDate)} dateFormat={DATE_ISO_FORMAT} />
        </div>
        <div style={formInputStyle}>
            <label>Room:</label>
            <select value={room} onChange={changeRoom}>
                <option value="">Any</option>
                {studio.rooms.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
        </div>
        <div>
            <div>Available periods: {availableRehearsals.length === 0 ? 'None' : ''}</div>
            {availableRehearsals.map(r => <Rehearsal key={`${r.room}-${r.period.from}`} rehearsal={r} onClick={chooseAvailableRehearsal}></Rehearsal>)}
        </div>
        <div style={formInputStyle}>
            <label>From:</label>
            <DatePicker {...timePickerProps} selected={from} onChange={changeDate(setFrom)} />
        </div>
        <div style={formInputStyle}>
            <label>To:</label>
            <DatePicker {...timePickerProps} selected={to} onChange={changeDate(setTo)} />
        </div>
    </div>;
}