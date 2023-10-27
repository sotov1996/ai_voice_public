#!/bin/bash
PUBLICIP=$(wget -O - -q icanhazip.com)
echo $PUBLICIP
echo "--install nginx--"
sudo apt-get update
sudo apt-get install -y nginx
echo "--install node--"
sudo curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential
echo "--install pm2--"
sudo npm install pm2@latest -g
echo -e "server {\nlisten 80 default_server;\nlisten [::]:80 default_server;\nroot /var/www/html;\nserver_name $PUBLICIP;\nclient_max_body_size 10m;\nlocation /{\nproxy_pass http://localhost:3001;\nproxy_http_version 1.1; \nproxy_set_header Upgrade \$http_upgrade;\nproxy_set_header Connection 'upgrade';\nproxy_set_header Host \$host;\nproxy_cache_bypass \$http_upgrade;\nproxy_connect_timeout 900;\nproxy_send_timeout 900;\nproxy_read_timeout 900;\nsend_timeout 900;\n}\n}" | sudo tee -a /etc/nginx/sites-available/$PUBLICIP
sudo ln -s /etc/nginx/sites-available/$PUBLICIP /etc/nginx/sites-enabled/
echo "--setting ufw--"
sudo ufw app list
sudo ufw allow 'Nginx HTTP'
sudo ufw allow OpenSSH
yes Y | sudo ufw enable
cd /
s="https://github.com/sotov1996/ai_voice_public.git"
sudo git clone --single-branch --branch master $s
var1=${s#*repos/}
echo =====cd $var1=====
cd $var1
echo =====sudo npm i=====
sudo npm i
echo =====sudo npm run build-prod=====
sudo npm run build-prod
echo =====sudo pm2 production=====
sudo pm2 start npm --name "production" -- run server-prod
echo "--change default config"
sudo sed -i 's/default_server//g' /etc/nginx/sites-available/default
sudo nginx -t
sudo systemctl restart nginx
echo "--END--"


echo =====cd /ai_voice_public=====
cd /ai_voice_public
echo =====sudo git pull=====
sudo git pull
echo ====sudo pm2 delete====
sudo pm2 delete "production"
echo ====killall node=====
sudo killall node
echo =====sudo npm i=====
sudo npm i
echo =====sudo npm run build-prod=====
sudo npm run build-prod
echo =====sudo pm2 production=====
sudo pm2 start npm --name "production" -- run server-prod
