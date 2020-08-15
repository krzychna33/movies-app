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
	@docker exec -t movies-app-backend chmod 777 /app/runTests.sh
	@docker exec -t movies-app-backend /bin/sh -c "./runTests.sh"

attach-console:
	@docker logs --follow $(movies-app-backend-id)
