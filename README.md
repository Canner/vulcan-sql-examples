# VulcanSQL Examples

This repo contains a curated list of VulcanSQL examples.

- [COVID 19 Global Data API](./covid19-global-data-api/): First demo
  - connector: DuckDB
  - dataset: CSV
  - visualization: Streamlit
  - deployment: Fly.io
- [Yelp Dataset API](./yelp-dataset-api/): This demonstrates how VulcanSQL with built-in data privacy mechanisms helps protect your data
  - connector: DuckDB
  - dataset: CSV to Parquet
  - visualization: Streamlit
  - deployment: Fly.io
- [Customer Support on Twitter](./customer-support-on-twitter/): VulcanSQL can empower applications with text embeddings thanks to the pgVector extension of PostgreSQL
  - connector: PostgreSQL(using Neon, serverless PostgreSQL)
  - dataset: CSV + text embeddings generated from Cohere
  - visualization: Streamlit
  - deployment: Fly.io
- [Make a Admin Panel in Appsmith](./admin-panel-using-appsmith/): An example to demonstrate that how VulcanSQL can integrate with internal tools such as Appsmith
- [Read Data from Internet](./read-data-from-internet/): A minimum example to demonstrate that now we can directly query data from the Internet with the help of the `httpfs` extension in DuckDB
- [HuggingFace](./huggingface/): The examples to VulcanSQL leverage the power of HuggingFace Extension
  - [Table Question Answering](./huggingface/table-question-answering/): The project demonstrates how VulcanSQL can leverage the power of Hugging Face Table Question Answering `huggingface_table_question_answering` to query your data simply.
- [VulcanSQL Benchmark test](./daily-revenue/): VulcanSQL performance evaluation using k6
- [[WIP]: Kaggle: Credit Card customers](./kaggle-credit-card-customers/)
- [[WIP]: VulcanSQL Extensions](./vulcan-sql-extensions/)

## Public Datasets

Here is [a list of public datasets](https://canner.notion.site/Public-Dataset-ca99a4ddf04b4993bf09da0e1640df32?pvs=4) you may find interesting and we hope they can spir your inspiration!
