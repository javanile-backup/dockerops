# dockerops

[![Build Status](https://travis-ci.org/javanile-bot/dockerops.svg?branch=master)](https://travis-ci.org/javanile-bot/dockerops)
[![Maintainability](https://api.codeclimate.com/v1/badges/0d76f0f853fa588d8a53/maintainability)](https://codeclimate.com/github/javanile-bot/dockerops/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/0d76f0f853fa588d8a53/test_coverage)](https://codeclimate.com/github/javanile-bot/dockerops/test_coverage)

Super-fantastic wrapper for docker-compose operations

> **DISCLAIMER**: Dockerops it is a development tool, please not use in production environments.
> Develop smart and fast, deploy production on safe but automatically

## How to install

```
sudo npm install -g dockerops
```

## How to use

|  dockerops              |  docker-compose                         |
|-------------------------|-----------------------------------------|
| `dockerops`             | `docker-compose ps`                     |
| `dockerops up`          | `docker-compose up -d --remove-orphans` |
| `dockerops stop`        | `docker-compose stop`                   |
| `dockerops stop --all`  | `docker stop $(docker pa -q -a)`        |
| `dockerops <service>`   | `docker-compose exec <service> bash`    |
