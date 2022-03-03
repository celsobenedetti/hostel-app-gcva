include ./.env

init: docker-compose.yml .env;
	@echo -e "\nIniciando configuração de container's...\n"; \
	docker-compose up -d; \
	echo -e "\nAdicionando scripts...\n"; \
	cp ./config/script/deploy_script.sh ${PAYARA_LOCAL_DIR}/bin/deploy_script.sh; \

run: docker-compose.yml;
	docker-compose up -d; \

deploy: ;
	@echo -e "\nBuild 'backend' project maven...\n"; \
	mvn --file ./backend/pom.xml clean package; \
	echo -e "\nBuild 'frontend' project maven...\n"; \
	mvn --file ./frontend/pom.xml clean package; \
	echo -e "\nRealizando deploy em Payara Server Container\n"; \
	cp ./backend/target/backend-1.0-SNAPSHOT.war ${PAYARA_LOCAL_DIR}/deployments/backend.war; \
	cp ./frontend/target/frontend-1.0-SNAPSHOT.war ${PAYARA_LOCAL_DIR}/deployments/frontend.war; \
	docker exec -it hostel-app-gcva_hostel-app-server_1 /opt/payara41/bin/deploy_script.sh; \
	echo -e "\nProcesso de deployment concluído com sucesso.\nAcesse a aplicação em http://localhost:8080/frontend"; \

drop: docker-compose.yml .env docker;
	docker-compose stop; \
	docker-compose rm -f; \
	docker volume rm -f hostel-app-gcva_mysql-data; \
	rm -rf docker; \
