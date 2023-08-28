{% req repositories %}
 SELECT * FROM read_csv_auto('Top200StaredRepositories.csv')
{% endreq %}

{% set question = context.params.question %}

SELECT {{ repositories.value() | huggingface_table_question_answering(query=question, wait_for_model=true) }} as result
