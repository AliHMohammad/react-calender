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

function getHoliday(day: string, month: string, year: string, holidays: IHoliday[]): IHoliday | undefined {
    const date = `${year}-${month}-${day}`;
    return holidays.find(holiday => holiday.date === date);
}


export default function CalenderColumn({date, holidays}: Props) {
    const [weekday, dateString] = date.split(" ");
    const letter = weekday[0].toUpperCase();
    const [day, month, year] = (dateString.split("."));
    let weekNumber: number | null = null;


    if (letter == "M") weekNumber = getWeekNumber(Number(day), Number(month), Number(year));
    const holiday = getHoliday(day.padStart(2, "0"), month.padStart(2, "0"), year, holidays);

    return (
        <div className={`border border-gray-700 ${letter == "S" || holiday?.nationalHoliday ? "column-light-color": "column-color"}`}>
            <div className="flex justify-between" >
                <div className={`pr-2 ${letter == "L" && "column-light-color"}`}>
                    <span className="mx-1.5 text-center light-color">{letter}</span>
                    <span className="light-color">{day}</span>
                    {holiday?.nationalHoliday && <span className="mx-1.5 light-color">{holiday.name}</span>}
                </div>
                <div>
                    {weekNumber && <span className="mx-1.5 light-color font-bold">{weekNumber}</span>}
                </div>
            </div>



        </div>
    )
}


//className={`inline-block ${letter == "L" && "column-light-color"}`}

/*
 {weekNumber && (
 <div className="flex justify-end">

 <span className="mx-1.5 light-color font-bold">{weekNumber}</span>
 </div>
 )}
 */