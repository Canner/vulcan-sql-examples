SELECT 
    businesses.*,
    {% masking 'tips.user_id' partial(2, 'xxxxxxx', 2) %} AS tip_user_id,
    tips.text AS tip_text,
    tips.date AS tip_date,
    tips.compliment_count AS tip_compliment_count
FROM 'data/yelp_academic_dataset_business.parquet' AS businesses
INNER JOIN (
    SELECT * FROM 'data/yelp_academic_dataset_tip.parquet'
) tips ON (
    businesses.business_id = tips.business_id
)
WHERE businesses.business_id = {{ context.params.business_id | is_required }}