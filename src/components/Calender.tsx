import {useEffect, useState} from "react";


const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
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

    console.log(dates)
    return dates ? (
        <div className="grid grid-cols-6">
            {dates.map((month, i) => {
                return (
                    <>
                        <div>
                            <h2>{i}</h2>
                            {month.map((date) => {
                                return (
                                    <>
                                        <div>
                                            <p className="">{date}</p>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </>
                )
            })}


        </div>
    ) : <h2>Loading...</h2>
}