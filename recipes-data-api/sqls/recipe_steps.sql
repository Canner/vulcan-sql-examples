SELECT arrayJoin(directions)
FROM recipes
WHERE title = {{ context.params.recipe }}