SELECT
    title,
    length(NER),
    length(directions)
FROM recipes
WHERE has(NER, {{ context.params.ingredient }})
ORDER BY length(directions) DESC