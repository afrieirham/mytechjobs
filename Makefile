.PHONY: all run-mongo create-db run-supertokens

all: create-db

run-mongo:
	docker stop mongodb || true
	docker rm mongodb || true
	docker run -d --name mongodb -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=password -p 27017:27017 mongo:latest

create-db:| run-mongo
	@echo "Waiting for MongoDB to start..."
	@{ \
		while ! docker exec mongodb mongosh -u root -p password --eval "printjson(db.serverStatus())" > /dev/null 2>&1; do \
			echo "Waiting for MongoDB to start..."; \
			sleep 1; \
		done \
	} &
	sleep 5
	docker exec -it mongodb mongosh -u root -p password --authenticationDatabase admin --eval "db.getSiblingDB('mydb').createUser({user: 'myuser', pwd: 'mypassword', roles: [{role: 'readWrite', db: 'mydb'}]})"

run-supertokens:
	docker stop supertokens || true
	docker rm supertokens || true
	docker run -d --name supertokens -p 3567:3567 registry.supertokens.io/supertokens/supertokens-postgresql:4.6