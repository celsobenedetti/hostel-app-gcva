include ./.env

init: docker-compose.yml .env.example;
	cp .env.example .env; \
	docker-compose up -d; \
	cp ./config/script/deploy_script.sh ${PAYARA_LOCAL_DIR}/bin/deploy_script.sh; \

run: docker-compose.yml;
	docker-compose up -d; \

deploy: ;
	@echo -e "\nBuild project maven...\n"; \
	mvn --file ./backend/pom.xml clean package; \
	echo -e "\nRealizando deploy in Payara Server Container\n"; \
	cp ./backend/target/hostel-demo-1.0-SNAPSHOT.war ${PAYARA_LOCAL_DIR}/deployments/api.war; \
	docker exec -it hostel-app-gcva_hostel-app-server_1 /opt/payara41/bin/deploy_script.sh; \

drop: docker-compose.yml .env docker;
	docker-compose stop; \
	docker-compose rm -f; \
	docker volume rm -f hostel-app-gcva_mysql-data; \
	rm .env; \
	rm -rf docker; \
