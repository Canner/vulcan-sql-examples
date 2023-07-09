# Quickstart

## Know your data

We used [Kaggle: Credit Card customers](https://www.kaggle.com/datasets/sakshigoyal7/credit-card-customers) as our demo dataset, the following is its background:

> A manager at the bank is disturbed with more and more customers leaving their credit card services. They would really appreciate if one could predict for them who is gonna get churned so they can proactively go to the customer to provide them better services and turn customers' decisions in the opposite direction

We have two tables in our database from part of this dataset (first 1000 rows):

- [customers](https://github.com/Canner/vulcan-demo/blob/main/data/customers.csv) contains the basic information of our customers
- [churners](https://github.com/Canner/vulcan-demo/blob/main/data/churners.csv) contains the monitoring result of them including their age, salary, marital status …etc, and `attrited` column indicates whether the customer was attrited or not.

Instead of making predictions, we want to create APIs for further usage, we'll make two APIs in this tutorial:

- `/customer?name=${name}` to query user's basic information.
- `/customers?<filter>` to query users' monitoring results that fit the filter.

## Make an API with SQL: customer

?> At any time you get lost, or you want to see the final result, feel free to check the full examples which are located in `sqls/examples` folder.

1.  Open `sqls/customer.sql`, it should already contain a SQL query like the below:

    ```sql
    SELECT * FROM customers
    WHERE UPPER(first_name) = 'LIUKA'
    LIMIT 1
    ```

    We'd like to use the name of the user's input `name` to replace the static string “LIUKA”, so please update the SQL using the [template variable](https://vulcansql.com/api-building/sql-template#dynamic-parameter) `{{ context.params.name }}`.

    ```sql
    SELECT * FROM customers
    WHERE UPPER(first_name) = {{ context.params.name }}
    LIMIT 1
    ```

    Your first API with parameters input is done! Try the API by visiting it:

    - [{{ endpoint }}/api/customer?name=GABEY]({{ endpoint }}/api/customer?name=GABEY)
    - [{{ endpoint }}/api/customer?name=KENDELL]({{ endpoint }}/api/customer?name=KENDELL)

    ?> Is it safe to render data from external sources like the user's input? <br/>
       Yes, we'll parameterize all the user input like the below to prevent SQL injections. <br/>
       ![screenshot of parameterd queries](https://imgur.com/BWZc2tA.png) <br />
       Check [Display the variable](https://vulcansql.com/api-building/sql-template#display-the-variable--dynamic-parameter) for more information.


2.  Apply a [filter](./api-building/sql-template#filters) to the input, we can to `upper` filter to let our input be case-insensitive.

    ```sql
    SELECT * FROM customers
    WHERE UPPER(first_name) = {{ context.params.name | upper }}
    LIMIT 1
    ```

    Now, test with some names in lower case:

    - [{{ endpoint }}/api/customer?name=kendell]({{ endpoint }}/api/customer?name=kendell)

3.  Throw error when user not found. We can let our API better by showing an accurate error message.
    First, we need to execute an extra query to know whether the user is in our database:

    ```sql
    {% req user %}
    SELECT COUNT(*) AS count FROM customers
    WHERE UPPER(first_name) = {{ context.params.name | upper }}
    {% endreq %}

    SELECT * FROM customers
    WHERE UPPER(first_name) = {{ context.params.name | upper }}
    LIMIT 1
    ```

    The block `{% req user %} ... {% endreq %}` is a [query block](https://vulcansql.com/api-building/sql-builder) which tells VulcanSQL that we want to save the query result to `user` variable instead of outputting as responses.

    Now we can get the result of this query and throw an error when the result equals `0`.

    ```sql
    {% req user %}
    SELECT COUNT(*) AS count FROM customers
    WHERE UPPER(first_name) = {{ context.params.name | upper }}
    {% endreq %}

    {% if user.value()[0].count == 0 %}
      {% error "CUSTOMER_NOT_FOUND" %}
    {% endif %}

    SELECT * FROM customers
    WHERE UPPER(first_name) = {{ context.params.name | upper }}
    LIMIT 1
    ```

    We used the if expression to throw an error when the result equals `0`, VulcanSQL server will stop executing and respond immediately when meeting a `{% error %}` tag, `"CUSTOMER_NOT_FOUND"` is the error code we want to throw.

  ?> You can add more information about your errors, e.g. description, HTTP code …etc. Please check [Error response](https://vulcansql.com/api-building/error-response)

    You can test with some invalid names:

    - [{{ endpoint }}/api/customer?name=some-invalid-name]({{ endpoint }}/api/customer?name=some-invalid-name)

4.  Throw an error when the name is ambiguous. We noticed that some customers have the same first name, let's figure them out and throw an error.
    We'll need to use the user's count twice, in order the reuse the result, we need to save the result first.

    ```sql
    {% req user %}
    SELECT COUNT(*) AS count FROM customers
    WHERE UPPER(first_name) = {{ context.params.name | upper }}
    {% endreq %}

    {% set userCount = user.value()[0].count %}

    {% if userCount == 0 %}
      {% error "CUSTOMER_NOT_FOUND" %}
    {% endif %}

    SELECT * FROM customers
    WHERE UPPER(first_name) = {{ context.params.name | upper }}
    LIMIT 1
    ```

    `{% set %}` tag saved the result from the right side like most programming languages: `var someVar = someVal`, in this example, we saved the query result into `userCount` variable.

  ?> Please save only the data you need in template logic, these data will be stored in VulcanSQL server memory and only exist while the template is executing. <br/>
      Please check [Set tag](https://vulcansql.com/api-building/sql-template#set-variable) for more information.

    Let's finish the last part: throw `CUSTOMER_IS_AMBIGUOUS` error:

    ```sql
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
    ```

    You can test with user `Hayden`

    - [{{ endpoint }}/api/customer?name=Hayden]({{ endpoint }}/api/customer?name=Hayden)

5.  The last step: add a [sample request](https://vulcansql.com/api-building/api-document#set-sampler). VulcanSQL is unable to describe our API responses until we give it a sample request. When you open the [API document]({{ endpoint }}/doc#/paths/~1customer/get), you'll see nothing has been described yet.

    ![api document with empty response](https://imgur.com/fzPxCAU.png)

    Open the file `sql/customer.yaml`, and add a sample request.

    ```yaml
    urlPath: /customer
    profiles:
      - demo
    request:
      - fieldName: name
        fieldIn: query
    sample:
      profile: demo
      parameters:
        name: 'Liuka'
    ```

    We have the schema for our response now!

    ![api document with proper response](https://imgur.com/waDtJh6.png)

## Make an API with SQL: customers

1.  Open `sqls/customers.sql`, it should already contain a SQL query like the below:

    ```sql
    SELECT
      id,
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
    LIMIT 10
    ```

    Let's implement a sample offset and limit pagination:

    ```sql
    SELECT
      id,
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

    OFFSET {{ context.params.offset | default(0) }}
    LIMIT {{ context.params.limit | default(20) }}
    ```

    You can try your API:

    - [{{ endpoint }}/api/customers?limit=10]({{ endpoint }}/api/customers?limit=10)
    - [{{ endpoint }}/api/customers?limit=10&offset=10]({{ endpoint }}/api/customers?limit=10&offset=10)

2.  Same as we did at the last API, we can add some where conditions from users' inputs:

    ```sql
    SELECT
      id,
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
    ```

    We use `default` filter here to set the fallback value. When users don't send the parameter, we use a default value.

    Unlike the last API, we use `{% if %}` expression the determine whether render the SQL or not, the queries in if blocks are only sent when the condition is satisfied.

    You can try this API with different parameters to see the queries changed:

    - [{{ endpoint }}/api/customers?age_gt=45]({{ endpoint }}/api/customers?age_gt=45)
    - [{{ endpoint }}/api/customers?age_gt=45&gender=m]({{ endpoint }}/api/customers?age_gt=45&gender=m)
    - [{{ endpoint }}/api/customers?age_gt=45&gender=m&attrited=yes]({{ endpoint }}/api/customers?age_gt=45&gender=m&attrited=yes)

3.  Let's finish the tutorial with a cool feature: render by users' attribute. Assuming we don't want to show the id of the customer to all people because it might be sensitive, we can mask it when the API requester is not an administrator.
    You can use your own authenticators for your organization, please check [Authenticator](https://vulcansql.com/api-building/access-control/authenticator) for further information. In this tutorial, we use a mock authenticator: You can simply be authenticated by adding `user` parameter, e.g. [{{ endpoint }}/api/customers?user=tom]({{ endpoint }}/api/customers?user=tom)
    We've set two users and their groups in the config:

    ```yaml
    - name: may
      attr:
        group: engineer
    - name: tom
      attr:
        group: admin
    ```

    Now we want to mask the id column when the user's attribute is not `admin`:

    ```sql
    SELECT
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

    ```

    You can try this API with different users:

    - [{{ endpoint }}/api/customers?user=tom]({{ endpoint }}/api/customers?user=tom)
    - [{{ endpoint }}/api/customers?user=may]({{ endpoint }}/api/customers?user=may)

    ![api response with masked result](https://imgur.com/hQLWPN5.png)
