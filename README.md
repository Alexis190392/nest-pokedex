<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desa

1. Clonar repo
2. Ejecutar
```
yarn install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar BD
```
docker-compose up -d
```
5. Clonar le archivo ```.env.template``` y renombrer la copia a ```.env```.

6. Llenar las variables de entorno definidas en el ```.env```.

7. Ejecutar la aplicacion en dev:
```
yarn start:dev
```

8. Reconstruir la BD con seed
```
localhost:3000/api/v2/seed
```


## Stack usado
* MongoDB
* Nest


## PRODUCCION BUILD
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de prod
3. Contruir/crear la imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
3.1. Para volver a lanzar imagen ya creada:
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up -d
```