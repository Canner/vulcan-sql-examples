# Customer Support on Twitter

This project demonstrates how VulcanSQL can leverage the power of Neon, a serverless PostgreSQL service, to create data applications available to do semantic search!

- Dataset: https://www.kaggle.com/datasets/thoughtvector/customer-support-on-twitter/versions/10?resource=download
- API documentation: https://customer-support-on-twitter.fly.dev/
- DEMO:https://customer-support-on-twitter-demo.fly.dev/

## Prerequisites

### Create a table on Neon

You can generate a table using `psql` or use the SQL editor on Neon.

```sql
CREATE TABLE twcs (
    tweet_id SERIAL PRIMARY KEY,
    author_id VARCHAR(50) NOT NULL,
    inbound boolean,
    created_at DATE,
    text TEXT,
    text_embeddings VECTOR(4096),
    response_tweet_id TEXT,
    in_response_to_tweet_id TEXT
);
```

### Insert data

**Notes: since we are using the Cohere model in free trial version, so we only chose the first 5000 rows from the dataset**

Check [gen-embeddings](./gen-embeddings/gen_embeddings.py). In short, we first give texts to the Cohere model to get their respective embeddings; then, we use `psycopg2` to bulk insert the dataset.