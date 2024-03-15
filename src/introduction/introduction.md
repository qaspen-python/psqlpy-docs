---
title: Introduction
---

## PSQLPy - what is it?
`PSQLPy` is a brand new Python driver for `PostgreSQL` fully written in Rust. It was inspired by `Psycopg3` and `AsyncPG`.  
This project has two main goals:  
Make a interaction with the database as fast as possible and now `PSQLPy` shows itself to be many times faster than the above drivers.  
Don't make useless abstractions and make it like a mirror to `PostgreSQL`.  

It has all necessary components to create high-load and fault tolerance applications.
::: info
It is extremely important to understand that the library will provide a noticeable acceleration in working with the database only if your queries are optimized.  
Otherwise, there will be acceleration, but not so significant
:::

## Why PSQLPy?
There are some reasons:
- If you are looking for maximum available performance with `PostgreSQL` from `Python`.  
- If you want to be sure that the program will not crash at random due to an incorrectly passed type. As underline language is Rust you need to specify all types correctly with respect to type hints from python stub files.  
- If you want to use new and actively maintaining driver.

Library has syntax and methods similar to `Psycopg3` and `AsyncPG`, so it must be easy to change one driver to another.

## Important notes
All statements will be prepared by default. You can read more about it here [PostgreSQL Docs](https://www.postgresql.org/docs/current/sql-prepare.html)  
But in some situations this behavior can break you application. As an example, if you are using `PGBouncer` with `Transaction Pooling Mode` [Docs](https://devcenter.heroku.com/articles/best-practices-pgbouncer-configuration#transaction-pooling-mode-recommended) or `Statement Pooling Mode` [Docs](https://devcenter.heroku.com/articles/best-practices-pgbouncer-configuration#transaction-pooling-mode-recommended) you need to disable statement preparation. You can read how to do it in the next parts of the documentation.
