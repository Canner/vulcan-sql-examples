SELECT 
    tweet_id,
    author_id,
    created_at,
    text,
    text_embeddings
FROM twcs 
ORDER BY text_embeddings <-> {{ context.params.query }}
LIMIT 3;