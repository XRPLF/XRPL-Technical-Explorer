#run commands for docker image

### build it
docker-compose up --build --no-recreate -d

### launch it
docker-compose up -d   

### connect it
docker exec -it vite_docker sh  

### stop it
docker compose down