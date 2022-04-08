#!/bin/bash
echo -e "AS_ADMIN_PASSWORD=admin" > password
asadmin -u admin --passwordfile password add-library ../lib/mysql-connector-java-8.0.28.jar; \
asadmin -u admin --passwordfile password create-jdbc-connection-pool --datasourceclassname com.mysql.cj.jdbc.MysqlDataSource --restype javax.sql.DataSource --property User=root:Password=password:DatabaseName=hostelDB:ServerName=34.207.73.254:Port=32769:UseSSL=false:AllowPublicKeyRetrieval=true mysql-pool; \
asadmin -u admin --passwordfile password create-jdbc-resource --connectionpoolid mysql-pool jdbc/mysql-pool
