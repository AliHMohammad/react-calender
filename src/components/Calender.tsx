import {useEffect, useState} from "react";
import CalenderRow from "./CalenderRow.tsx";
import {getHolidays} from "../service/apiFacade.ts";


const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
}

type THoliday = {
    date: string,
    name: string,
    nationalHoliday: string
}

export default function Calender() {
    const [dates, setDates] = useState<string[][] | null>(null);
    const [holidays, setHolidays] = useState<THoliday | null>(null);


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


    useEffect(() => {
        try {
            //const result =  getHolidays(new Date().getFullYear());

            //setHolidays(result);
            console.log(holidays)
        } catch (e) {
            console.log(e);
        }
    }, []);


    return dates ? (
        <div className="grid grid-cols-6 relative w-[98%] mx-auto">
            {dates.map((month, i) => <CalenderRow key={i} month={month} index={i}/>)}
        </div>
    ) : <h2>Loading...</h2>
}