{% req user %}
SELECT COUNT(*) AS count FROM customers 
WHERE UPPER(first_name) = {{ context.params.name | upper }}
{% endreq %}

{% set userCount = user.value()[0].count %}

{% if userCount == 0 %}
  {% error "CUSTOMER_NOT_FOUND" %}
{% endif %}

{% if userCount > 1 %}
  {% error "CUSTOMER_IS_AMBIGUOUS" %}
{% endif %}

SELECT * FROM customers
WHERE UPPER(first_name) = {{ context.params.name | upper }}
LIMIT 1