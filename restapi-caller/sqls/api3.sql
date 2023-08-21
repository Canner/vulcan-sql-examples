{% set a_variable_you_can_define = { "query": { "q": "phone" }  } %}
SELECT {{ a_variable_you_can_define | rest_api(url='https://dummyjson.com/products/search') }}