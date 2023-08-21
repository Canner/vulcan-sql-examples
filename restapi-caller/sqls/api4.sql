{% set a_variable_you_can_define = { "body": { "title": "BMW Pencil" } } %}
SELECT {{ a_variable_you_can_define | rest_api(url='https://dummyjson.com/products/add', method='POST') }}