include ./.env

#Deve ser executado na primeira interação com o projeto
init: docker-compose.yml .env;
	@-echo -e "\nIniciando configuração de container's...\n"; \
	docker-compose up -d; \
	echo -e "\nAdicionando scripts...\n"; \
	cp ./config/script/payara/*.sh ${PAYARA_LOCAL_DIR}/bin/; \
	sudo chmod -R 777 ${PAYARA_LOCAL_DIR}; \
	echo -e "\nPronto!\n"; \

#Apenas para instanciar containers
run: docker-compose.yml;
	docker-compose up -d; \

#Build

build_backend: ;
	@echo -e "\nbuild 'backend' project maven...\n"; \
	mvn --file ./backend/pom.xml clean package; \
	echo -e "\nPronto!\n"; \

build_frontend: ;
	@echo -e "\nBuild 'frontend' project maven...\n"; \
	mvn --file ./frontend/pom.xml clean package; \
	echo -e "\nPronto!\n"; \

#Deployment

#Realiza deploy apenas do frontend
deploy_frontend: build_frontend;
	@echo -e "\nRealizando deploy 'frontend' em Payara Server Container\n"; \
	cp ./frontend/target/frontend-1.0-SNAPSHOT.war ${PAYARA_LOCAL_DIR}/deployments/frontend.war; \
	docker exec -it hostel-app-gcva_hostel-app-server_1 /opt/payara41/bin/deploy_frontend_script.sh; \
	echo -e "\nProcesso de deployment concluído com sucesso.\nAcesse a aplicação em http://localhost:8080/frontend"; \
	echo -e "\nPronto!\n"; \

#Realiza deploy apenas do backend
deploy_backend: build_backend;
	@echo -e "\nRealizando deploy 'backend' em Payara Server Container\n"; \
	cp ./backend/target/backend-1.0-SNAPSHOT.war ${PAYARA_LOCAL_DIR}/deployments/backend.war; \
	docker exec -it hostel-app-gcva_hostel-app-server_1 /opt/payara41/bin/deploy_backend_script.sh; \
	echo -e "\nProcesso de deployment concluído com sucesso.\nAcesse a aplicação em http://localhost:8080/backend"; \
	echo -e "\nPronto!\n"; \

#Realiza deploy de tudo
deploy_all: deploy_frontend deploy_backend;


#Redeployment

#Realiza redeploy apenas do frontend
redeploy_frontend: build_frontend;
	@echo -e "\nRealizando redeploy 'frontend' em Payara Server Container\n"; \
	cp ./frontend/target/frontend-1.0-SNAPSHOT.war ${PAYARA_LOCAL_DIR}/deployments/frontend.war; \
	docker exec -it hostel-app-gcva_hostel-app-server_1 /opt/payara41/bin/redeploy_frontend_script.sh; \
	echo -e "\nProcesso de redeployment concluído com sucesso.\nAcesse a aplicação em http://localhost:8080/frontend"; \
	echo -e "\nPronto!\n"; \

#Realiza redeploy apenas do backend
redeploy_backend: build_backend;
	@echo -e "\nRealizando redeploy 'backend' em Payara Server Container\n"; \
	cp ./backend/target/backend-1.0-SNAPSHOT.war ${PAYARA_LOCAL_DIR}/deployments/backend.war; \
	docker exec -it hostel-app-gcva_hostel-app-server_1 /opt/payara41/bin/redeploy_backend_script.sh; \
	echo -e "\nProcesso de redeployment concluído com sucesso.\nAcesse a aplicação em http://localhost:8080/backend"; \
	echo -e "\nPronto!\n"; \

#Realiza redeploy de tudo
redeploy_all: redeploy_frontend redeploy_backend;

#Apaga tudo do projeto e o deixa pronto para o make init, funcionionando como um restart
drop: docker-compose.yml .env docker;
	@echo -e "\n Parando container's...\n"; \
	docker-compose stop; \
	echo -e "\n Removendo container's...\n"; \
	docker-compose rm -f; \
	echo -e "\n Removendo docker volume: mysql-data...\n"; \
	docker volume rm -f hostel-app-gcva_mysql-data; \
	rm -rf docker; \
	echo -e "\nPronto!\n"; \

