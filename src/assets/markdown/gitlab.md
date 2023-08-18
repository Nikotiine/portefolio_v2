# Gitlab-CE / Docker



## Minimum requis

* Debian 11
* Docker engine & docker compose 
* Access ssh /direct au serveur  droit => root 
* Avoir un nom de domaine qui pointe sur votre serveur

## Mise en place des outils 
* Mise à jour de debian et installation de Apache


```bash
 sudo apt-get update && sudo apt-get upgrade
```
```bash
 sudo apt-install vim wget git apache2 apache2-utils 
```

* Installation de docker 

```bash
sudo apt-get update
```
```bash
sudo apt-get install ca-certificates curl gnupg
```

```bash
sudo install -m 0755 -d /etc/apt/keyrings
```
```bash
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```
```bash
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

```bash
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

```bash
sudo apt-get update
```

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
## Configuration de apache sur le serveur

```bash 
sudo apt-get install apache2 apache2-utils
```
```bash
sudo apt install certbot python3-certbot-apache
```
* Verifiez que apache est en route

```bash
sudo systemctl status apache2
```

### Créer le vhost du gitlab
* Désactiver le vhost par defaut
```bash
a2dissite 000-default.conf
```

### Vhost ServerName =  [url.du.serveur sans http://]

* Créer le nouveau fichier de configuration

```bash
sudo vim www.gitlab.conf
```
```bash
<VirtualHost *:80>

ServerName gitlab.local
DocumentRoot /var/www/html

</VirtualHost>
```

* Activer le nouveau fichier de configuration

```bash
sudo a2ensite www.gitlab.conf 
```
```bash
sudo systemctl restart apache2
```
* Obtenir le certificat ssl

```bash
certbot --apache
```
* Une fois fait vous devriez ovoir un nouveau fichier .conf

```bash
<IfModule mod_ssl.c>
<VirtualHost *:443>

ServerName gitlab.local
DocumentRoot /var/www/html

SSLCertificateFile /etc/letsencrypt/live/gitlab.local/fullchain.pem
SSLCertificateKeyFile /etc/letsencrypt/live/gitlab.local/privkey.pem
Include /etc/letsencrypt/options-ssl-apache.conf

</VirtualHost>
</IfModule>
```
* Si le site est accessible en ssl étape suivante: 

### Modifier les vhosts pour utiliser docker
* Le vhost http 
```bash
<VirtualHost *:80>

ServerName gitlab.local
DocumentRoot /var/www/html

RewriteEngine on
ProxyPass / http://localhost:8043/
ProxyPassReverse / http://localhost:8043/

RewriteCond %{SERVER_NAME} =gitlab.local
RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]

</VirtualHost>
```
* Le vhost https
```bash
<IfModule mod_ssl.c>
<VirtualHost *:443>

DocumentRoot /var/www/html
ServerName gitlab.local

ProxyPass / http://localhost:8043/
ProxyPassReverse / http://locahost:8043/
ProxyPreserveHost on

SSLCertificateFile /etc/letsencrypt/live/gitlab.local/fullchain.pem
SSLCertificateKeyFile /etc/letsencrypt/live/gitlab.local/privkey.pem
Include /etc/letsencrypt/options-ssl-apache.conf

</VirtualHost>
</IfModule>
```
* Activer le proxy pass
```bash
sudo a2enmod proxy && sudo a2enmod proxy_http
```
* Redémarrer Apache
```bash
sudo systemctl restart apache2
```
### Cloner le repo dans /home/[user]/gitlab_perso/

```bash
git clone https://gitlab.nicolas-godin.fr/Nikolas/docker_gitlab.git
```
```bash
cd docker_gitlab
```
> **Note*** <br>
> Si vous êtes sur une puce intel penser à modifier le docker-compose.yml à la **ligne 4** <br>
> et changer **image: 'yrzr/gitlab-ce-arm64v8'** <br> 
> par **image: 'gitlab/gitlab-ce'**
* Mise en route du container docker avec docker-compose
```bash
docker compose up -d
```
* Patientez le temps de la création du container (4/5 minutes)
## SI tout va bien 

Dans le localHost:8043 en https vous avez gitlab

### Derniere etape, avoir accés au gitlab en tant que root 
```bash
sudo docker exec -it gitlab-ce bash 
```
```bash
gitlab-rails console -e production
```
```bash
user = User.where(id: 1).first
```
```bash
user.password = 'secret_pass'
```
```bash
user.password_confirmation = 'secret_pass'
```
```bash
user.save!
```
```bash
exit && exit
```
