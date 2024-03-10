import {handleHttpErrors, makeOptions} from "./fetchUtils.ts";

const API_URL = "https://api.sallinggroup.com/v1/holidays";
//Bearer token for sallinggroup is saved in an .env file with the key "VITE_BEARER_TOKEN".
const TOKEN = import.meta.env.VITE_BEARER_TOKEN as string;

async function getHolidaysForYear(year: number) {
    const options = makeOptions("GET", null, TOKEN);
    return await fetch(`${API_URL}?startDate=${year}-01-01&endDate=${year}-12-31`, options).then(handleHttpErrors);
}


export {getHolidaysForYear}