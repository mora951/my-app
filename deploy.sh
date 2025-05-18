set -e
APP_NAME='my-app'

if [[ $# -eq 0 ]]; then
    ENV='dev'
else
    ENV=$1
fi

if [[ $1 == '--help' || $1 == '-h' ]]; then
    echo 'Usage: deploy [ENV]'
    echo -e '\nIf no argument provided, app will be served using development server without PM2.'
    exit
fi

echo '[Updating code from Git]'
git pull

echo -e '\n[Installing dependencies]'  
yarn install

echo -e '\n[Building for \e[1;32m' $ENV '\e[0m environment]'
yarn build

echo -e '\n[Running \e[1;34m'$APP_NAME'\e[0m in\e[1;32m' $ENV '\e[0m environment]'
pm2 stop $APP_NAME
pm2 delete $APP_NAME
pm2 start yarn --time --name $APP_NAME -- start
