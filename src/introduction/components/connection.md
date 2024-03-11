---
title: Connection
---
`Connection` object represents single connection to the `PostgreSQL`. You must work with database within it.  
`Connection` get be made with `PSQLPool().connection()` method.

```python
from psqlpy import PSQLPool


db_pool: Final = PSQLPool(
    dsn="postgres://postgres:postgres@localhost:5432/postgres",
)


async def main() -> None:
    ...
    connection = await db_pool.connection()
```

## Connection methods

### Execute
You can execute any query directly from `Connection` object.  
This method supports parameters, each parameter must be marked as `$<number>` (number starts with 1).  
Parameters must be passed as list after a querystring.
```python
async def main() -> None:
    ...
    connection = await db_pool.connection()
    results: QueryResult = await connection.execute(
        "SELECT * FROM users WHERE id = $1 and username = $2",
        [100, "Alex"],
    )

    dict_results: list[dict[str, Any]] = results.result()
```

### Transaction
`Connection` is the only object that can be used to build `Transaction` object.  
All parameters for transaction:
- `isolation_level`: level of isolation. Default how it is in PostgreSQL.
- `read_variant`: configure read variant of the transaction. Default how it is in PostgreSQL.
- `deferrable`: configure deferrable of the transaction. Default how it is in PostgreSQL.

Let's see some example:
```python
from psqlpy import IsolationLevel, ReadVariant

async def main() -> None:
    ...
    connection = await db_pool.connection()
    transaction = connection.transaction(
        isolation_level=IsolationLevel.Serializable,
        read_variant=ReadVariant.ReadWrite,
        deferrable=True,
    )
```