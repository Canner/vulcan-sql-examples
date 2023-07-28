# dbt jaffle_shop

## Setup

- dbt
    - go to the `jaffle_shop` directory
        - `install poetry`: https://python-poetry.org/docs/#installation
        - `poetry install`: it will install `dbt-duckdb`
        - setup `~/.dbt/profile.yaml` and change the content as following:
        ```yaml
        jaffle_shop:
            outputs:

                dev:
                    type: duckdb
                    path: '[give duckdb file path here]' # '/Users/cyyeh/Desktop/vulcan-sql-examples/dbt-jaffle-shop/jaffle_shop/jaffle_shop.db'
                prod:
                    type: postgres
                    threads: [1 or more]
                    host: [host]
                    port: [port]
                    user: [prod_username]
                    pass: [prod_password]
                    dbname: [dbname]
                    schema: [prod_schema]

            target: dev
        ```
        - `poetry run dbt seed`
        - `poetry run dbt run`
- VulcanSQL
    - it's installed globally via npm
    - go to the root of the project directory
        - `npm install`
        - `vulcan start --watch`
        - `vulcan catalog`