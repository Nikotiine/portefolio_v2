<p align="center">Mis en place d'un serveur Debian / Apache et Nodejs<p align="center">
 
## Description

Aide pour le deployement d'une API REST sous NESTJS et de la partie client sous ANGULAR > 14.0

## Pre-requis 

* Une VM Debian
* Un terminal ouvert (sous windows preferer Cmdr)
* Access ssh a la VM Debian > 10
* Configurer les route de l'api avec le prefix /api
* Configuerer le proxi de angular avec la redirection sur localhost:3000

```
{
  "/api": {
    "target":"http://localhost:3000/",
    "secure": true,
    "chaneOrigin": true,
    "logLevel": "debug"
  }
}
```

## Premier pas

* Une fois connecter la machine vituelle commencer par mettre a jour Debian
```bash
apt-get update && apt-get upgrade
```
* Se connecter en Sudo 
```bash
sudo -S
```
* Ensuite nous installons les differents paquets necessaires au fonctionement du serveur 
* Apache 2 Et Apache-utils
* Mysql 
* curl 
* wget 
* nodejs > V.16
* npm > V9
* fail2ban
* iptables
* git 
* pm2 
* certbot

### Mise en route de Apache2
Installation
```bash
apt-get install apache2 
apt-get install apache2-utils
```
Verification que le serveur est bien installer et qu'il tourne 
```bash
service apache2 status
```
Et sur l'url du serveur vous devriez avoir la page d'accueil du serveur apache :'it's works'

### Installation des gestionnaires de paquets 
```bash
apt-get install curl
apt-get install wget
```

### Installation de Git
```bash
apt-get install git
```
 ### Installation de MySql 
```bash
wget https://dev.mysql.com/get/mysql-apt-config_0.8.22-1_all.deb 
apt install ./mysql-apt-config_0.8.22-1_all.deb
apt update
apt install mysql-server
```
* Repondre OK a toute les questions pose si pas de configuration particuliere
* Rentre un mot de passe fort pour l'acces root a mysql 

Un fois fini verifiez que le service tourne
```bash
service mysql status
```
### Installation de NodeJs et npm 
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash - &&\
apt-get install -y nodejs
```
Verifier la version 
```bash
node -v
npm -v
```
// attendu : node v.18.* et npm v9.*
### Securite du serveur avec fail2ban
```bash
apt-get install iptables
apt-get install fail2ban
apt update
apt upgrade
```
### Installation du serveur Node
```bash
npm install -g pm2
```
### Clone du repo Angular du projet
```bash
cd /var/www
git clone [https://gitlab.com/[pseudo]/[app-angular].git
```
* Une fois les repos cloner commencons par le front-end
* cd /var/www/repertoire-du-front/
```bash
npm run build
```
### Installation de l'editeur de texte VIM
```bash
apt-get vim
```
### Mise en place du vhost http
```bash
vim /etc/apache2/sites-available/www.votre-site.conf
```
```
<VirtualHost *:80>
ServerName [www.votre-site.com]
DocumentRoot /var/www/[repertoire-front]/build/[repertoire-du-build]
</VirtualHost>
```
### Activer le vhost
```bash
a2ensite www.votre-site.conf
service apache2 restart
```
* Vous devriez voir votre front end sur le http://www.votre-site.com

## Mise en place du protocole SSL

```bash
apt-get install certbot
apt-get update
certbot
```
* Laisser certbot creer un nouveau vhost avec les info du vhost precedement configurer

### Modifions le vhost

```
<IfModule mod_ssl.c>
	<VirtualHost *:443>
		ServerName [www.votre-site.com]
		DocumentRoot /var/www/[repertoire-front]/dist/[repertoire-du-build]

		ProxyPreserveHost on
		ProxyPass /api/ http://localhost:3000/api/
		ProxyPassReverse /api/ http://localhost:3000/api/

		Include /etc/letsencrypt/options-ssl-apache.conf
		SSLCertificateFile /etc/letsencrypt/live/www.votre-site.com/fullchain.pem
		SSLCertificateKeyFile /etc/letsencrypt/live/www.votre-site.com/privkey.pem
	
		<Directory /var/www/[repertoire-front]/dist/[repertoire-du-build]>
        		RewriteEngine on       
		 	# Don't rewrite files or directories
        		RewriteCond %{REQUEST_FILENAME} -f [OR]
       			RewriteCond %{REQUEST_FILENAME} -d
        		RewriteRule ^ - [L]       
			 # Rewrite everything else to index.html to allow HTML5 state links
        		RewriteRule ^ index.html [L]
 		</Directory>
	</VirtualHost>
</IfModule>

```
<p align="center">
A ce stade nous n'avons pas encore mis en route l'api Rest sur le localhost:3000
</p>
<p align="center">
mais le vhost ssl est pret pour applique le proxy
</p>

### Mise en place de l'api
```bash
cd /var/www
git clone [https://gitlab.com/[pseudo]/[api-nest].git
cd /var/www/[api-nest]
npm run build
pm2 start npm --name"api-nest" -- start
```
<p align="center">
Pensez a configueur le port d'ecoute de l'api sur 3000 (configuration par defaut de node)
</p>
<p align="center">
Pensez a lancer la creation et les migrations de la bbd 
</p>
Verifier que le serveur node est activer

```bash
wget localhost:3000/api
```

### Une fois le serveur lancer
* Pour l'arreter / redemarrer / supprimer
```bash
pm2 stop 0
pm2 restart 0
pm2 remove all | pm2 remove 0
```

## Conclusion
* Vous devriez avoir votre site sur https://[www.votre-site.com]
* Votre serveur back-end devrait trouner sur le localhost:3000/api

### Documention
* pm2 -> https://pm2.keymetrics.io/
* mysql -> https://www.cloudbooklet.com/how-to-install-mysql-on-debian-11/
* angular -> https://angular.io/
* nestjs -> https://nestjs.com/