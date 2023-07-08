# COVID 19 Global Data API

## Project Introduction

This sample project is based on [VulcanSQL](https://github.com/Canner/vulcan-sql/). VulcanSQL is a Data API Framework that helps data folks build scalable data APIs using only SQL templates without any backend skills required.

In this project, we expose some apis based on COVID 19 Global Data downloaded from [WHO Coronavirus (COVID-19) Dashboard](https://covid19.who.int/data), and `WHO-COVID-19-global-data.csv` is the downloaded file.

## DEMO

- [COVID 19 Global Data APIs and Documentation](https://covid19-global-data-api.fly.dev/doc)
- [Data Dashboard](https://covid19-dashboard.fly.dev/)

## Setup

### Development

- [Install VulcanSQL from NPM](https://vulcansql.com/docs/get-started/installation#install-from-npm)
- `npm install` in the root of project directory
- `vulcan start --watch` and `vulcan catalog` in two seperate shell windows, and you can now access API documentation at `http://localhost:3000/docs` and catalog at `http://localhost:4000`

### Deployment

**There are a lot of deployment options as of now, we provide [Fly.io](https://fly.io/) as an example since we can deploy the project for [free](https://fly.io/docs/about/pricing/), we can easily prevent apps from hibernation and it's simple to use!**

- COVID-19 global data APIs(VulcanSQL):
    - install [fly.io](https://fly.io/docs/hands-on/install-flyctl/)
    - `fly auth login`
    - `vulcan package --output docker`
    - `cd dist`(We provide it for demonstration purpose, and you can ignore it in `.gitignore` if you want)
        - notice that you need to copy `profiles.yaml` and other necessary files manually if you do it yourself.
            - You can check `Dockerfile` for further details
    - `fly launch`
        - Please take a look at `fly.toml`, which is a configuration file from Fly.io. It will be auto-generated if you run `fly launch`. We provide it here for your reference.
    - `fly deploy`
- COVID-19 data dashboard(Streamlit):
    - please check [here](visualizations/streamlit/README.md#Deployment)

## APIs introduction

- `/countries`: get a list of countries and their country codes
- `/max_cases`: get a list of countries or WHO regions that have the most cases on a given date range
- `/max_deaths`: get a list of countries or WHO regions that have the most deaths on a given date range
- `/min_cases`: get a list of countries or WHO regions that have the minimum cases on a given date range
- `/min_deaths`: get a list of countries or WHO regions that have the minimum deaths on a given date range
- `/reports`: get a list of COVID-19 reports by countries and date range
- `/who_regions`: get a list of WHO regions

## Data introduction

|Field name|Type|Description|
|---|---|---|
|Date_reported|Date|Date of reporting to WHO|
|Country_code|String|ISO Alpha-2 country code|
|Country|String|Country, territory, area|
|WHO_region|String|WHO regional offices: WHO Member States are grouped into six WHO regions -- Regional Office for Africa (AFRO), Regional Office for the Americas (AMRO), Regional Office for South-East Asia (SEARO), Regional Office for Europe (EURO), Regional Office for the Eastern Mediterranean (EMRO), and Regional Office for the Western Pacific (WPRO).|
|New_cases|Integer|New confirmed cases. Calculated by subtracting previous cumulative case count from current cumulative cases count.|
|Cumulative_cases|Integer|Cumulative confirmed cases reported to WHO to date.|
|New_deaths|Integer|New confirmed deaths. Calculated by subtracting previous cumulative deaths from current cumulative deaths.|
|Cumulative_deaths|Integer|Cumulative confirmed deaths reported to WHO to date.|

## Data Visualizations

- [Streamlit](visualizations/streamlit/)
