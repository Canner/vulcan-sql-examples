
-- Using the `meta-llama/Llama-2-13b-chat-hf` model, data must have less than 4096 tokens, so need to limit data row and column for universities.
{% req universities %}
 SELECT rank,institution,"location code", "location" FROM read_csv_auto('2023-QS-World-University-Rankings.csv') LIMIT 100
{% endreq %}

{% set question = context.params.question %}

SELECT {{ universities.value() | huggingface_text_generation(query=question, model="meta-llama/Llama-2-13b-chat-hf", wait_for_model=true) }} as result