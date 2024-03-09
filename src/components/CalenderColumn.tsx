

type Props = {
    date: string
}

export default function CalenderColumn({date}: Props) {
    const [weekday, dateString] = date.split(" ");
    const letter = weekday[0].toUpperCase();
    const [dayNumber, month, year] = (dateString.split("."));
    let weekNumber: number | null = null;

    if (letter == "M") {
        const date1 = new Date(Number(year), Number(month) - 1, Number(dayNumber))
        const oneJan =  new Date(date1.getFullYear(), 0, 1);
        const numberOfDays =  Math.floor((date1.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
        weekNumber = Math.ceil(( date1.getDay() + 1 + numberOfDays) / 7);
    }


    return (
        <div className={`grid grid-cols-2 border border-gray-700 ${letter == "S" ? "bg-gray-600": "column-color"}`}>
            <div className={`${letter == "L" && "bg-gray-600"}`}>
                <span className="mx-1.5 w-3 text-center">{letter}</span>
                <span className="w-3">{dayNumber}</span>
            </div>
            <div className="flex justify-end">
                {weekNumber && <span className="mx-1.5">{weekNumber}</span>}
            </div>

        </div>
    )


}