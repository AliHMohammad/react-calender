import {useEffect, useState} from "react";
import CalenderRow from "./CalenderRow.tsx";
import {getHolidaysForYear} from "../service/apiFacade.ts";


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
        const datesArr: string[][] = [[]];

        let month = 0;
        let dateNum = 0;
        while (date.getMonth() < 6) {
            if (date.getMonth() !== 0 && date.getDate() === 1) {
                month++;
                dateNum = 0;
                datesArr[month] = [];
            }

            datesArr[month][dateNum] = new Intl.DateTimeFormat("da-DK", options).format(date);

            date.setDate(date.getDate() + 1);
            dateNum++;
        }

        setDates(datesArr);
    }, []);


    useEffect(() => {
        let flag = true;

        try {
            if (flag) {
                const result =  getHolidaysForYear(new Date().getFullYear());
                //setHolidays(result);
                console.log(holidays)
            }
            return () => {
                flag = false;
            }
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