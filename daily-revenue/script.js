import http from "k6/http";
import { sleep } from "k6";

function generateRandomDate(startYear = "1996") {
  const startDate = new Date(`${startYear}-01-01`).getTime();
  const endDate = new Date(`${startYear}-11-30`).getTime();

  const randomTimestamp = startDate + Math.random() * (endDate - startDate);
  const randomDate = new Date(randomTimestamp);
  const year = randomDate.getFullYear();
  const month = String(randomDate.getMonth() + 1).padStart(2, "0");
  const day = String(randomDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function () {
  const date1 = generateRandomDate();
  const date2 = generateRandomDate();
  let startDate = date1 < date2 ? date1 : date2;
  let endDate = date1 <= date2 ? date2 : date1;
  while (startDate < new Date("1996-01-01")) {
    const date1 = generateRandomDate();
    const date2 = generateRandomDate();
    tartDate = date1 < date2 ? date1 : date2;
    endDate = date1 <= date2 ? date2 : date1;
  }

  http.get(
    `http://localhost:3000/api/daily_revenue?startdate=${startDate}&enddate=${endDate}`
  );
  sleep(1);
}
