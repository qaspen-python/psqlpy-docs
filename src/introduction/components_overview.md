---
title: Components Overview
---

## Components
- `Connection pool`: hold connections in itself and give them when requested.
- `Connection`: represent single database connection, can be retrieved from `Connection pool`.
- `Transaction`: represent database transaction, can be made from `Connection`.
- `Cursor`: represent database cursor, can be made from `Transaction`.
- `QueryResult`: represent list of results from database.
- `SingleQueryResult`: represent single result from the database.
- `Exceptions`: we have some custom exceptions.

## Connection pool