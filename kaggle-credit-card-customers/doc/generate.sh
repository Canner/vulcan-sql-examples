cp ./template/README.md .
sed -i "s,{{ endpoint }},$(gp url 3000 || echo 'http://localhost:3000'),g" README.md