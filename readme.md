# Movies app

### Endpoints documentation:
[API Docs](https://documenter.getpostman.com/view/4098545/T1LPE7qt?version=latest)

### Setup

* clone this repo,
* rename .env.example -> to .env and fill it with your data,
* for *tests* rename .env.test.example -> to .env.test and fill it with your data,
* build docker services with: ``make build-all``, it will build node.js and mongodb
* run docker services with ``make run``, it will make node.js and mongodb running
* to run tests type ``make test``

Check **Makefile** for additional commends like ```stop, rebuild etc.```

### Live version

[https://pacific-anchorage-48514.herokuapp.com/](https://pacific-anchorage-48514.herokuapp.com/)