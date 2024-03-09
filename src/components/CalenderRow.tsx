import CalenderColumn from "./CalenderColumn.tsx";

type Props = {
    month: string[]
    index: number
}

const MONTHS = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"];

export default function CalenderRow({month, index}: Props) {
    const year = new Date().getFullYear();

    return (
        <div>
            <h2 className="text-center font-bold light-color my-1">{`${MONTHS[index]} ${year}`}</h2>
            {month.map((date, i) => {
                return (
                    <CalenderColumn key={i} date={date}/>
                )
            })}
        </div>
    )
}