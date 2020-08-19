movies-app-backend-id=$(shell docker ps -a -q -f "name=movies-app-backend")
movies-app-mongo-id=$(shell docker ps -a -q -f "name=movies-app-mongo")

build-all:
	@docker-compose -f docker-compose.yml build

run:
	@docker-compose -f docker-compose.yml up -d

stop:
	@docker-compose stop

rm-backend:
	@docker rm $(movies-app-backend-id)

rm-mongo:
	@docker rm $(movies-app-mongo-id)

rm-all: rm-backend rm-mongo

rebuild: stop rm-all build-all run

test:
	@docker exec -t movies-app-backend chmod 777 /app/runTests.sh
	@docker exec -t movies-app-backend /bin/sh -c "./runTests.sh"

attach-console:
	@docker logs --follow $(movies-app-backend-id)
