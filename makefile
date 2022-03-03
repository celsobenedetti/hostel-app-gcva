init: docker-compose.yml .env.example;
	cp .env.example .env; \
	docker-compose up -d; \

run: docker-compose.yml;
	docker-compose up -d;

deploy: ;
	mvn -f ./backend/pom.xml clean package
	
drop: docker-compose.yml .env docker;
	docker-compose stop; \
	docker-compose rm; \
	docker volume rm hostel-app-gcva_mysql-data; \
	rm .env; \
	rmdir docker; \