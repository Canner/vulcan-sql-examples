SELECT
    arrayJoin(NER) AS ingredient,
    count() AS recipe_count
FROM recipes
GROUP BY ingredient
ORDER BY recipe_count DESC