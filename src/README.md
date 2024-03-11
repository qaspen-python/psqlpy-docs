---
home: true
icon: home
title: PSQLPy documentation
heroImage: ./logo.png
heroText: PSQLPy
tagline: Asynchronous Python PostgreSQL driver written in Rust
actions:
  - text: Let's start
    icon: lightbulb
    type: primary
    link: ./introduction/lets_start
  
  - text: Introduction
    link: ./introduction/introduction

highlights:
  -  features:
      - title: Fully Asynchronous
        details: Support native rust/python asynchronous. It's easy as it seems.

      - title: Fully Typed
        details: PSQLPy has type for each class, function, method and etc.

      - title: Blazingly Fast
        details: PSQLPy beats others PostgreSQL drivers in different benchmarks.

      - title: Under active development
        details: PSQLPy is under active development.
---
## What is PSQLPy
You can consider `PSQPy` as `Psycopg3` or `AsyncPG` but it has more security and it's faster.  
PSQLPy API is a link from `PostgreSQL` to `Python`, it means that if you can do specific command only in transaction then `PSQLPy` won't provide this command in `Connection` or `Cursor`, it will be available only in `Transaction` object.

## How to install
Using pip
```bash
pip install psqlpy
```

Using poetry
```
poetry add psqlpy
```