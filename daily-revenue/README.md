# VulcanSQL Benchmark test

## Setup

- [Install VulcanSQL from NPM](https://vulcansql.com/docs/get-started/installation#install-from-npm)
- get your gcp credential json file and update the `profile.yaml` file
- `npm install` in the root of project directory
- `vulcan serve`, then your Data API will be served in `localhost:3000`

## APIs introduction

- `/daily_revenue`: get the daily revenue in a range period

## Run loading test with K6
- open another terminal and run `k6 run --duration 30s --vus=10 --summary-trend-stats="med,p(95),p(99.9)" script.js`
- --[vus](https://k6.io/docs/get-started/running-k6/#adding-more-vus) = add n virtual users   
- --duration = how many time the loading test will run
