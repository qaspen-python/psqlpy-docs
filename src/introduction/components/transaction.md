---
title: Transaction
---
`Transaction` object represents `PostgreSQL` transaction.  
There are two ways of how we can work with transactions on `PSQLPy` side.

### Control transaction fully on your own.
First of all, you can get transaction object only from connection object.
```python
from psqlpy import PSQLPool


db_pool: Final = PSQLPool(
    dsn="postgres://postgres:postgres@localhost:5432/postgres",
)


async def main() -> None:
    await db_pool.startup()
    connection = await db_pool.connection()
    transaction = connection.transaction()
```

After this you need to start you transaction or in `PostgreSQL` terms you need to BEGIN it.
```python
async def main() -> None:
    ...
    connection = await db_pool.connection()
    transaction = connection.transaction()
    await transaction.begin()
```
So, after these manipulations you are ready to make you first query with the transaction.
```python
async def main() -> None:
    ...
    await transaction.execute(
        "INSERT INTO users (id, username) VALUES ($1, $2)",
        ["100", "Alex"],
    )
```
Good! We've inserted our first row, but if we won't commit the transaction all changes will discard.  
::: warning
We need to commit our changes.
:::
```python
async def main() -> None:
    ...
    await transaction.commit()
```
So, now everything is fine, changes are committed. But you can say that it's too complicated and you are right!  
We have an alternative way to handle `begin()` and `commit()` automatically.

### Control transaction with async context manager.
There is previous example but it is rewritten with use of async context manager.
```python
from psqlpy import PSQLPool


db_pool: Final = PSQLPool(
    dsn="postgres://postgres:postgres@localhost:5432/postgres",
)


async def main() -> None:
    await db_pool.startup()
    connection = await db_pool.connection()
    async with connection.transaction() as transaction:
        # begin() calls automatically
        await transaction.execute(
            "INSERT INTO users (id, username) VALUES ($1, $2)",
            ["100", "Alex"],
        )
        # commit() calls automatically.
```

::: tip Cool tip
If a query raises an error in our async context manager, `ROLLBACK` is executed automatically.
:::
::: important
Transaction can be began only once, so if you have already called `begin()` manually then async context manager initialize will fail, you need to choose what to use.
:::