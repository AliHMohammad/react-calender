import {handleHttpErrors, makeOptions} from "./fetchUtils.ts";

const API_URL = "https://api.sallinggroup.com/v1/holidays";
const TOKEN = import.meta.env.VITE_BEARER_TOKEN as string;

async function getHolidays(year: number) {
    const options = makeOptions("GET", null, TOKEN);
    return await fetch(`${API_URL}?startDate=${year}-04-01&endDate=${year}-04-30`, options).then(handleHttpErrors);
}


export {getHolidays}