---
home: true
icon: home
title: Project home
heroImage: ./logo.png
heroText: PSQLPy
tagline: Asynchronous Python PostgreSQL driver written in Rust
actions:
  - text: Let's start
    icon: lightbulb
    type: primary
    link: ./introduction/
  
  - text: Introduction
    link: ./introduction/

highlights:
  -  features:
      - title: Fully Asynchronous
        details: Support native rust/python asynchronous. It's easy as it seems.

      - title: Fully Typed
        details: PSQLPy has type for each class, function, method and etc.

      - title: The fastest
        details: PSQLPy beats others PostgreSQL driver in different benchmarks.

      - title: Under active development
        details: PSQLPy is under active development.
---
## What is PSQLPy
You can consider `PSQPy` as `Psycopg3` or `AsyncPG` but it has more security and it's faster.

## How to install
Using pip
```bash
pip install psqlpy
```

Using poetry
```
poetry add psqlpy
```