SELECT
    -- dynamic data masking
    {% masking id partial(2, 'xxxxxxx', 2) %} as id,
    department,
    last_name,
    company_role,
    -- column level security
    {% if context.user.attr.role == 'employer' %}
        annual_salary
    {% else %}
        NULL AS annual_salary
    {% endif %}
FROM read_csv_auto('departments.csv', HEADER=True)
-- row level security
{% if context.user.attr.role != 'employer' %}
    WHERE department = {{ context.user.attr.department }}
{% endif %}
