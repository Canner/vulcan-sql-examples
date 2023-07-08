# COVID-19 Data Dashboard Using [Streamlit](https://streamlit.io/)

## Setup

- python version: `3.10`
- install [Poetry](https://python-poetry.org/docs/#installation)
- `poetry install`

## Development

- `poetry run streamlit run main.py`, and the website URL will be `http://localhost:8501`

## Deployment

- install [fly.io](https://fly.io/docs/hands-on/install-flyctl/)
    - `fly auth login`
    - `cd visualizations/streamlit`
    - `fly launch`
        - Please take a look at `fly.toml`, which is a configuration file from Fly.io. It will be auto-generated if you run `fly launch`. We provide it here for your reference.
        - Modify `Procfile` if needed, and we provide it for your reference.
    - `fly secrets set -a [APPLICATION_NAME] API_URL=[COVID-19 global data APIs URL | https://covid19-global-data-api.fly.dev/api]`
    - `fly deploy`
