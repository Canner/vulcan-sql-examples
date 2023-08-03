# Data Sharing

This example demonstrates VulcanSQL's authentication and authorization mechanisms.

For authentication
- HTTP Basic: the password is the same as the respective user name

For authorization
- adding user attributes in `vulcan.yaml`
- dynamic data masking: `id` column
- column level security: `annual_salary` column
- row level security: engineering and sales departments can't see each other's data

## Setup

- VulcanSQL: `0.7.2`, installed globally using npm
- run `yarn` in the root of the project directory
- run `vulcan start --watch` to start the VulcanSQL API Server(http://localhost:3000)
- run `vulcan catalog` to explore data from the API(http://localhost:4200)

## References

- [VulcanSQL Authentication & Authorization](https://vulcansql.com/docs/data-privacy/overview)
