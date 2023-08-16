# Installation PL SQL sur Mac Os

### Pre-requis
* 25go de libre
* docker et docker compose
* MacOs ou Linux hors processeur Apple Silicone
* Compte Github actif

### Installation 
* En premier lieu telecharger le [zip oracle](https://www.oracle.com/database/technologies/oracle-database-software-downloads.html)
* Creer un repertoire pour l'installation
```bash
mkdir oracle
```

* Aller dans le repertoire
```bash
cd oracle
```
* Cloner le repo github suivant 
```bash
git clone https://github.com/oracle/docker-images.git
```
* Deplacer le zip oracle sur le chemain suivant <br>

`/oracle/docker-images/OracleDatabase/SingleInstance/dockerfiles/19.3.0/`
* Deplacer vous dans le repertoire suivant <br>

`cd /oracle/docker-images/OracleDatabase/SingleInstance/dockerfiles`
* et entrer la ligne de commande suivante
```bash
./buildContainerImage.sh -v 19.3.0 -e
```
### Patientez pendant l'installation (entre 5 à 10 minutes suivant votre configuaration et connection)
* Ensuite créer un dossier d’instal du container :
```bash
mkdir -p ~/oracle/oradata/oracle19c
```
* Executer le lancement du container

```bash
docker run --name oracle19c -p 1521:1521 -p 5500:5500 -v /Users/[VOTRENOMDUTILISATEUR]/oracle/oradata/oracle19c:/opt/oracle/oradata oracle/database:19.3.0-ee
```

### Re-patientez le temps du build (1/2h)
* Changez le mot de passe de la base de donnée
```bash
docker exec oracle19c ./setPassword.sh [votremotdepasse]
```

## Connection
Ouvrir un gestionnaire de base de donnee (datagrip / bearer ou tablePlus)

Se connecter a la base de donnee avec les parametres suivant
* host : **localhost**
* SID : **ORCLPDB1**
* port : **1521**
* user : **system**
* password : **[votremotdepasse]**
* URL : **jdbc:oracle:thin:@localhost:1521/ORCLPDB1**
