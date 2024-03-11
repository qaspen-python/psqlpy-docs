---
title: Introduction
---

## PSQLPy - what is it?
PSQLPy is a library that allows you to work with `PostgreSQL` database. For example, running CRUD queries like SELECT.  
It has Connections, Connection Pool, Transactions, Cursors and ways to operate this abstracts.   
The main goal of this library is speed. It is written in Rust and outperforms all exists drivers, at least with our benchmarks.

## Why PSQLPy?
There are some reasons:
- If you are looking for maximum available performance with `PostgreSQL`, you definitely have to try `PSQLPy`.  
- If you want to be sure that the program will not crash at random due to an incorrectly passed type. As underline language is Rust you need to specify all types correctly with respect to type hints from python stub files.  
- If you want to use new and actively maintaining driver.

Library has syntax and methods similar to `Psycopg3` and `AsyncPG`, so it must be easy to change one driver to another.