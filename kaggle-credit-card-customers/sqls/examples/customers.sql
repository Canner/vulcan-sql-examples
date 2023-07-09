SELECT
  --- show the full id only if user's group = admin
  {% if context.user.attr.group == 'admin' %} 
    id
  {% else %}
    CONCAT(SUBSTR(id, 0, 4), 'xxxxxx')
  {% endif %} as id,
  age,
  gender,
  education_level,
  marital_status,
  income_category,
  months_on_book,
  total_relationship_count,
  months_inactive_12_mon,
  contacts_count_12_mon,
  credit_limit,
  attrited
FROM churners

WHERE
age > {{ context.params.age_gt | default(0) }}

{% if context.params.gender %}
AND gender = {{ context.params.gender | upper }}
{% endif %}

{% if context.params.attrited %}
  {% set attrited = context.params.attrited == 'yes' %}
  AND attrited = {{ attrited }}
{% endif %}

OFFSET {{ context.params.offset | default(0) }}
LIMIT {{ context.params.limit | default(20) }}