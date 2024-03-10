import IHoliday from "../models/IHoliday.ts";


type Props = {
    date: string
    holidays: IHoliday[]
}

function getWeekNumber(day: number, month: number, year: number): number {
    const date1 = new Date(year, month - 1, day)
    const oneJan =  new Date(date1.getFullYear(), 0, 1);
    const numberOfDays =  Math.floor((date1.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil(( date1.getDay() + 1 + numberOfDays) / 7);
}

function getHoliday(paddedDate: string, holidays: IHoliday[]): IHoliday | undefined {
    return holidays.find(holiday => holiday.date === paddedDate);
}

export default function CalenderColumn({date, holidays}: Props) {
    const [weekday, dateString] = date.split(" ");
    const letter = weekday[0].toUpperCase();
    const [day, month, year] = (dateString.split("."));
    let weekNumber: number | null = null;


    if (letter == "M") weekNumber = getWeekNumber(Number(day), Number(month), Number(year));
    const holiday = getHoliday(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`, holidays);


    return (
        <div className={`border border-gray-700 ${letter == "S" || holiday?.nationalHoliday ? "column-light-color": "column-color"}`}>
            <div className="flex justify-between" >
                <div className={`flex justify-between pr-2.5 ${letter == "L" && "column-light-color"}`}>
                    <span className="mx-1.5 w-3 light-color">{letter}</span>
                    <span className="w-3 light-color">{day}</span>
                    {holiday?.nationalHoliday && <span className="mx-3 light-color">{holiday.name}</span>}
                </div>
                <div>
                    {weekNumber && <span className="mx-1.5 light-color font-bold">{weekNumber}</span>}
                </div>
            </div>
        </div>
    )
}
