#!/bin/bash
echo -e "AS_ADMIN_PASSWORD=admin" > password
asadmin -u admin --passwordfile password redeploy --name frontend /opt/payara41/deployments/frontend.war