# Installation MS Sql Server

### Pre-requis
* Docker et docker compose 
* 4go de libre
* MacOs ou Linux hors processeur Apple Silicone

Ouvrir un terminal et taper la ligne
```bash
docker pull mcr.microsoft.com/mssql/server
```

Mettre le container docker en route
```bash
docker run -d --name sql_server -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=someThingComplicated1234' -p 1433:1433 mcr.microsoft.com/mssql/server:2019-latest 
```
Ouvrir un gestionnaire de base de donnee (datagrip / bearer ou tablePlus)

Se connecter a la base de donnee avec les parametres suivant
* host : **localhost**
* port : **1433**
* user : **sa**
* password : **someThingComplicated1234**

### Vous pouvez changer le mdp dans la mise en route du container si vous le desirez
