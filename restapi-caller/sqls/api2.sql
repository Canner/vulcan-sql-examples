{% set a_variable_you_can_define = { "path": { "id": 1 } } %}
SELECT {{ a_variable_you_can_define | rest_api(url='https://dummyjson.com/products/:id') }}