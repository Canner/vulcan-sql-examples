-- set group_by variable given query parameter
{% set group_by = context.params.group_by | default("Country_code") %}

-- in this api, we only support WHO_region or Country_code as group_by value
-- otherwise, we will throw a 400 error with below message
{% if group_by and group_by != "WHO_region" and group_by != "Country_code" %}
    {% error "group_by should be WHO_region or Country_code" %}
{% endif %}

-- get minimum deaths by country or WHO region given a date range
SELECT 
    {% if group_by == "WHO_region" %}
        WHO_region
    {% else %}
        Country_code
    {% endif %},
    SUM(New_deaths) as Total_deaths
FROM read_csv_auto('WHO-COVID-19-global-data.csv') 
WHERE 
    Date_reported >= {{ context.params.start_date | is_required }} AND 
    Date_reported <= {{ context.params.end_date | is_required }}
GROUP BY 
    {% if group_by == "WHO_region" %}
        WHO_region
    {% else %}
        Country_code
    {% endif %}
ORDER BY Total_deaths ASC
LIMIT {{ context.params.top_n | is_required }}