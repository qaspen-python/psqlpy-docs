---
title: Connection Pool
---
Connection pool is the main object in the library. It initializes, creates, holds and gives connection to the user side.  
Connection pool must be started up before any other operations.

## Connection pool methods

### All available PSQLPool parameters

- `dsn`: connection string with `postgres`/`postgresql` schema.
- `username`: name of the `PostgreSQL` user.
- `password`: password of the `PostgreSQL` user.
- `host`: host of the `PostgreSQL`.
- `port`: port of the `PostgreSQL`.
- `db_name`: database name in the `PostgreSQL`.
- `max_db_pool_size`: maximum size for the connection pool. Minimal and default = 2
- `conn_recycling_method`: how a connection is recycled.  

Some example of possible `dsn`s:
```
postgresql://user@localhost
postgresql://user:password@%2Fvar%2Flib%2Fpostgresql/mydb?connect_timeout=10
postgresql://user@host1:1234,host2,host3:5678?target_session_attrs=read-write
postgresql:///mydb?user=user&host=/var/lib/postgresql
```
::: important
If `dsn` is specified then other connection parameters don't have any effect.
:::

### Initialize Database Pool with separate parameters
There are two ways of how to connect to the database. First one is use connection parameters separately:
```python
import asyncio
from typing import Final

from psqlpy import PSQLPool

db_pool: Final = PSQLPool(
    username="postgres",
    password="postgres",
    host="localhost",
    port=5432,
    db_name="postgres",
    max_db_pool_size=10,
)

async def main() -> None:
    await db_pool.startup()
```

### Initialize Database Pool with DSN
Other way is use DSN:
```python
import asyncio
from typing import Final

from psqlpy import PSQLPool

db_pool: Final = PSQLPool(
    dsn="postgres://postgres:postgres@localhost:5432/postgres",
    max_db_pool_size=10,
)

async def main() -> None:
    await db_pool.startup()
```

### Execute

#### Parameters:
- `querystring`: Statement string.
- `parameters`: List of parameters for the statement string.
- `prepared`: Prepare statement before execution or not.

You can execute any query directly from Connection Pool.  
This method supports parameters, each parameter must be marked as `$<number>` (number starts with 1).  
Parameters must be passed as list after querystring.
::: caution
You must not use `PSQLPool.execute` method in high-load production code!  
It pulls connection from the pool each time you call `execute` method and it's necessary to block connection pool (like Mutex) which means no one other thread can not acquire connection pool.  
In you high-load production code you must retrieve connection from the pool `PSQLPool.connection` and use it for querying.
:::
```python
async def main() -> None:
    ...
    results: QueryResult = await db_pool.execute(
        "SELECT * FROM users WHERE id = $1 and username = $2",
        [100, "Alex"],
    )

    dict_results: list[dict[str, Any]] = results.result()
```

### Connection
To get single connection from the `PSQLPool` there is method named `connection()`.  

```python
async def main() -> None:
    ...
    connection = await db_pool.connection()
```
::: tip Cool tip
This is the preferable way to work with the PostgreSQL.
:::
