movies-app-backend-id=$(shell docker ps -a -q -f "name=movies-app-backend")

build-all:
	@docker-compose -f docker-compose.yml build

run:
	@docker-compose -f docker-compose.yml up -d

stop:
	@docker-compose stop

rm:
	@docker rm $(movies-app-backend-id)

rebuild: stop rm build-all run

test:
	@docker exec -t rma npm run test

test-u:
	@docker exec -t rma npm run test -- -u

build-server:
	@docker exec -t rma npm run build:server

attach-console:
	@docker logs --follow $(movies-app-backend-id)
