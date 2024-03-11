---
title: Components
---

## Components
- `Connection pool`: holds connections in itself and give them when requested.
- `Connection`: represents single database connection, can be retrieved from `Connection pool`.
- `Transaction`: represents database transaction, can be made from `Connection`.
- `Cursor`: represents database cursor, can be made from `Transaction`.
- `QueryResult`: represents list of results from database.
- `SingleQueryResult`: represents single result from the database.
- `Exceptions`: we have some custom exceptions.

