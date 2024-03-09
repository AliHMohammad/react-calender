import CalenderColumn from "./CalenderColumn.tsx";
import IHoliday from "../models/IHoliday.ts";

type Props = {
    month: string[]
    index: number
    holidays: IHoliday[]
}

const MONTHS = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"];

export default function CalenderMonth({month, index, holidays}: Props) {
    const year = new Date().getFullYear();

    return (
        <div>
            <h2 className="text-center font-bold light-color my-1">{`${MONTHS[index]} ${year}`}</h2>
            {month.map((date, i) => <CalenderColumn key={i} date={date} holidays={holidays} />)}
        </div>
    )
}