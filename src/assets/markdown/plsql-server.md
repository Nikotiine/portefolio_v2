# Installation PL SQL sur Mac Os

### Pré-requis
* 25go de libre
* docker et docker compose
* MacOs ou Linux hors processeur Apple Silicone
* Compte Github actif

### Installation 
* En premier lieu télécharger le [zip oracle](https://www.oracle.com/database/technologies/oracle-database-software-downloads.html)
* Créer un répertoire pour l'installation
```bash
mkdir oracle
```

* Aller dans le répertoire
```bash
cd oracle
```
* Cloner le repo github suivant 
```bash
git clone https://github.com/oracle/docker-images.git
```
* Déplacer le zip oracle sur le chemin suivant <br>

`/oracle/docker-images/OracleDatabase/SingleInstance/dockerfiles/19.3.0/`
* Se déplacer dans le répertoire suivant <br>

`cd /oracle/docker-images/OracleDatabase/SingleInstance/dockerfiles`
* et entrer la ligne de commande :
```bash
./buildContainerImage.sh -v 19.3.0 -e
```
### Patientez pendant l'installation (entre 5 à 10 minutes suivant votre configuration et connexion)
* Ensuite créer le dossier d’installation du container :
```bash
mkdir -p ~/oracle/oradata/oracle19c
```
* Exécuter le lancement du container

```bash
docker run --name oracle19c -p 1521:1521 -p 5500:5500 -v /Users/[VOTRENOMDUTILISATEUR]/oracle/oradata/oracle19c:/opt/oracle/oradata oracle/database:19.3.0-ee
```

### Re-patientez le temps du build (1/2h)
* Changer le mot de passe de la base de données
```bash
docker exec oracle19c ./setPassword.sh [votremotdepasse]
```

## Connexion
Ouvrir un gestionnaire de base de données (datagrip / bearer, tablePlus ..)
Se connecter à la base de données avec les paramètres suivants:
* host : **localhost**
* SID : **ORCLPDB1**
* port : **1521**
* user : **system**
* password : **[votremotdepasse]**
* URL : **jdbc:oracle:thin:@localhost:1521/ORCLPDB1**
