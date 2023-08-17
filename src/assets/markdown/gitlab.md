# docker_gitlab



## Minimu requis

* Debian 11
* Docker engine & docker compose 
* Access ssh /direct au serveur  droit => root 
* Avoir un nom de domaine qui pointe sur votre serveur

## Mise en place des outils 
```bash
 sudo apt-get update && sudo apt-get upgrade
 sudo apt-install vim wget git apache2 apache2-utils 
```

* installer docker 
```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
```

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
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
## Configration de apache sur le serveur

```bash 
sudo apt-get install apache2 apache2-utils
sudo apt install certbot python3-certbot-apache
```
* Verifiez que apache est en route
> sudo systemctl status apache2

### Creer le vhost du gitlab
* desctiver le vhost par defaut
> a2dissite 000-default.conf


### Vhost ServerName =  [url.du.serveur sans http://]

* creer le nouveau fichier de conf

> sudo vim www.gitlab.conf

```bash
<VirtualHost *:80>
ServerName gitlab.local
DocumentRoot /var/www/html
</VirtualHost>
````

* Activer le nouveau fichier de conf

```bash
sudo a2ensite www.gitlab.conf 
sudo systemctl restart apache2
```
* obtenir le certificat ssl
> certbot --apache

* une fois fais vous devriez ovoir un nouveau fichier de conf 

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
* si le site est accessible en ssl etape suivante 

### Modifer les vhosts et activer docker
* le vhost http 
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
* le vhost https
```bash
<IfModule mod_ssl.c>
<VirtualHost *:443>
ServerName gitlab.local
ProxyPass / http://localhost:8043/
ProxyPassReverse / http://locahost:8043/
DocumentRoot /var/www/html
ProxyPreserveHost on
SSLCertificateFile /etc/letsencrypt/live/gitlab.local/fullchain.pem
SSLCertificateKeyFile /etc/letsencrypt/live/gitlab.local/privkey.pem
Include /etc/letsencrypt/options-ssl-apache.conf
</VirtualHost>
</IfModule>
```
* activer le proxy pass
> sudo a2enmod proxy && sudo a2enmod proxy_http
* redemarrer apache 
> sudo systemctl restart apache2

### Cloner le repo dans /home/[user]/gitlab_perso/

```bash
git clone https://gitlab.nicolas-godin.fr/Nikolas/docker_gitlab.git
cd docker_gitlab
docker compose up -d
```
* Patientez le temps de la creation du container (4/5 minutes)
## SI tout va bien 

Dans le localHost:8043 vous avez gitlab , et dans l'url en https vous avez gitlab

### Derniere etape, avoir access au gitlab en tant que root 
```bash
sudo docker exec -it gitlab-ce bash 
gitlab-rails console -e production
user = User.where(id: 1).first
user.password = 'secret_pass'
user.password_confirmation = 'secret_pass'
user.save!
exit
exit
```