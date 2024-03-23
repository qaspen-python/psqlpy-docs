---
title: Let's Start
---

## Installation

You can install psqlpy with pip, poetry or directly from git using pip:

::: code-tabs#shell
@tab pip

```bash
pip install psqlpy
```

@tab poetry

```bash
poetry add psqlpy
```

@tab git

```bash
pip install git+https://github.com/qaspen-python/psqlpy
```

:::

After installation you are ready to start querying!

## First request to the database

There is a minimal example of what you need to do to send your first query and receive result.  
Let's assume that we have table `users`:  
| id | name | username |
| :---: | :---: | :---: |
| 1 | Aleksandr | chandr-andr |
| 2 | Michail | insani7y |

```python
import asyncio
from typing import Final

from psqlpy import PSQLPool, QueryResult


async def main() -> None:
    # It uses default connection parameters
    db_pool: Final = PSQLPool()

    results: Final[QueryResult] = await db_pool.execute(
        "SELECT * FROM users WHERE id = $1",
        [2],
    )

    dict_results: Final[list[dict[Any, Any]]] = results.result()
    await db.close()
```

::: tip
You must call `close()` on database pool when you application is shutting down.
:::
::: caution
You must not use `PSQLPool.execute` method in high-load production code!  
It pulls connection from the pool each time you call `execute` method and it's necessary to block connection pool (like Mutex) which means no one other thread can not acquire connection pool.  
In you high-load production code you must retrieve connection from the pool `PSQLPool.connection` and use it for querying.
:::
