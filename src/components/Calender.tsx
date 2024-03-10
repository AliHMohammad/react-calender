import {useEffect, useState} from "react";
import CalenderMonth from "./CalenderMonth.tsx";
import {getHolidaysForYear} from "../service/apiFacade.ts";
import IHoliday from "../models/IHoliday.ts";


const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
}



export default function Calender() {
    const [dates, setDates] = useState<string[][] | null>(null);
    const [holidays, setHolidays] = useState<IHoliday[] | null>(null);

    //useEffect for getting all the dates in the first 6 months of the current year
    //Store the result in the useState "dates"
    useEffect(() => {
        const date = new Date(new Date().getFullYear(), 0, 1);
        const datesArr: string[][] = [[]];

        let month = 0;
        let index = 0;
        while (date.getMonth() < 6) {
            if (date.getMonth() !== 0 && date.getDate() === 1) {
                month++;
                index = 0;
                datesArr[month] = [];
            }

            datesArr[month][index] = new Intl.DateTimeFormat("da-DK", options).format(date);

            date.setDate(date.getDate() + 1);
            index++;
        }

        setDates(datesArr);
    }, []);

    //Fetch holidays
    useEffect(() => {
        let flag = true;

        if (flag) {
            getHolidaysForYear(new Date().getFullYear())
                .then((res) => setHolidays(res))
                .catch((error) => {
                    console.log("Failed trying to fetch holidays:", error.message);
                })
        }

        return () => {
            flag = false;
        }
    }, []);

    return dates && holidays ? (
        <div className="grid grid-cols-6 relative w-[98%] mx-auto">
            {dates.map((month, i) => <CalenderMonth key={i} month={month} index={i} holidays={holidays}/>)}
        </div>
    ) : <h2>Loading...</h2>
}