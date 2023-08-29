# Recipes Data API

This example demonstrates how VulcanSQL can integrate with ClickHouse and share data APIs in no time!

## Setup

### ClickHouse

- [install ClickHouse](https://clickhouse.com/docs/en/install#quick-install)
    - `curl https://clickhouse.com/ | sh`
    - `./clickhouse server`: starting the server
    - `./clickhouse client`: starting the client
- [feed recipes dataset](https://clickhouse.com/docs/en/getting-started/example-datasets/recipes)
    - [download the dataset](https://clickhouse.com/docs/en/getting-started/example-datasets/recipes#download-and-unpack-the-dataset)
        - It's around 2.14GB
    - execute the following CREATE query in the clickhouse client
        ```sql
        CREATE TABLE recipes
        (
            title String,
            ingredients Array(String),
            directions Array(String),
            link String,
            source LowCardinality(String),
            NER Array(String)
        ) ENGINE = MergeTree ORDER BY title;
        ```
    - insert the dataset in the clickhouse client
        ```bash
        ./clickhouse client --query "
            INSERT INTO recipes
            SELECT
                title,
                JSONExtract(ingredients, 'Array(String)'),
                JSONExtract(directions, 'Array(String)'),
                link,
                source,
                JSONExtract(NER, 'Array(String)')
            FROM input('num UInt32, title String, ingredients String, directions String, link String, source LowCardinality(String), NER String')
            FORMAT CSVWithNames
        " --input_format_with_names_use_header 0 --format_csv_allow_single_quote 0 --input_format_allow_errors_num 10 < full_dataset.csv
        ```
- deployment: [single node deployment](https://clickhouse.com/docs/en/architecture/single-node-deployment)

### VulcanSQL

- install the latest version of VulcanSQL using npm: `npm install -g @vulcan-sql/cli`
- execute `npm install`
- execute `vulcan start --watch` in one terminal window
    - VulcanSQL API Server will be started at `http://localhost:3000`
- execute `vulcan catalog` in another terminal window
    - VulcanSQL Catalog Server will be started at `http://localhost:4200`
- deployment
    - please refer to [production](https://vulcansql.com/docs/deployment) and [cloud deployment guides](https://vulcansql.com/docs/deployment/flydotio)

## References

- [ClickHouse connector in VulcanSQL](https://vulcansql.com/docs/connectors/clickhouse)
- [Recipes Dataset](https://clickhouse.com/docs/en/getting-started/example-datasets/recipes)