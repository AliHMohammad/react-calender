import {useEffect, useState} from "react";
import CalenderColumn from "./CalenderColumn.tsx";
import CalenderRow from "./CalenderRow.tsx";


const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
}

type Date = {
    date: string,
    weekNumber: number;
}

type DateFather = {
    date: Date,
    month: string
}

export default function Calender() {
    const [dates, setDates] = useState<string[][] | null>(null);


    useEffect(() => {
        const date = new Date(new Date().getFullYear(), 0, 1);
        const save: string[][] = [[]];

        let month = 0;
        let dateNum = 0;
        while (date.getMonth() < 6) {
            if (date.getMonth() !== 0 && date.getDate() === 1) {
                month++;
                dateNum = 0;
                save[month] = [];
            }

            save[month][dateNum] = new Intl.DateTimeFormat("da-DK", options).format(date);

            date.setDate(date.getDate() + 1);
            dateNum++;
        }

        setDates(save);
    }, []);


    return dates && (
        <div className="grid grid-cols-6 relative w-[98%] mx-auto">
            {dates.map((month, i) => <CalenderRow key={i} month={month} index={i}/>)}
        </div>
    )
}