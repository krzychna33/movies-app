# Movies app

### Tech stack:
* Node.js
* TypeScript
* MongoDB

### Endpoints documentation:
[API Docs](https://documenter.getpostman.com/view/4098545/T1LPE7qt?version=latest)

### Setup

* clone this repo,
* Copy and rename .env.example -> to .env and fill it with your data,
* Copy and rename .env.test.example -> to .env.test and fill it with your data (in case you need test environment),
* Copy and rename .env.prod.example -> to .env.prod and fill it with your data (in case you need production environment),
* build docker services with: ``make build-all``, it will build node.js and mongodb
* run docker services with ``make run``, it will make node.js and mongodb running
* to run tests type ``make test``

### Live version

[https://pacific-anchorage-48514.herokuapp.com/](https://pacific-anchorage-48514.herokuapp.com/)