# Mandexpa-api
Api for magito project
List of technology
- Nodejs
- Hapi
- MySQL
- Boom: Create friendly error message
- Faker: Create sample data

# Install
- Configure DB file 
- DB configuration in the knex.js
- DB Sample in db/mandexpa.sql
- npm install
- node app.js
- seeder admin account: enter seeder folder and run: node generare_admin.js
- http://localhost:2603/ display welcome mandexpa: admin

# Install with Docker
 - Install docker compose 
 - Run  docker-compose up for start project
 - Set up workbench mysql and  connect to  mysql, The parameters in file knex.js
 - Comment docker exec -it app bash connect  console of container
 - Run command seeder for  generate account
 - node generate-admin.js
 - Remove old image: 
	- docker-compose down -v
	- docker rmi app -f

# Install NodeEmail (Dạng 1 dùng plugin) Ver1
 - Example function  testemail in file routes/account.js

# Install NodeEmail (Original,call function ) Ver1
 - Building ..