
type Props = {
    date: string
}

export default function CalenderColumn({date}: Props) {
    const [day, dateString] = date.split(" ");
    const letter = day[0].toUpperCase();
    console.log(letter)

    return (
        <div className="border border-gray-700 column-color">
            <p className="">{date}</p>
        </div>
    )
}