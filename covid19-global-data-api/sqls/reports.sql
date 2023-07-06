-- set country_codes variable given query parameter
{% set country_codes = context.params.country_code %}

-- get a list of COVID-19 reports given a date range and country codes(optional)
SELECT * FROM read_csv_auto('WHO-COVID-19-global-data.csv')
WHERE 
    Date_reported >= {{ context.params.start_date | is_required }} AND 
    Date_reported <= {{ context.params.end_date | is_required }}

    {% if country_codes %}
    AND Country_code IN (SELECT UNNEST(string_split({{ country_codes }}, ',')))
    {% endif %}