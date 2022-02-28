init: docker-compose.yml .env.example;
	mv .env.example .env; \
	sudo docker-compose up -d; \

run: docker-compose.yml;
	sudo docker-compose up -d;

drop: ;
	sudo docker-compose stop; \
	sudo docker-compose rm; \
	sudo docker volume rm hostel-app-gcva_mysql-data; \

