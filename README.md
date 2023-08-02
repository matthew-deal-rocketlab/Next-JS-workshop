# rlwm


## Quick setup

```
# Copy sample configuration files
cp env.sample .env
cp env.directus.sample ./directus/_data/opt/app/.env

# install node modules
cd api
yarn install
cd ../web
yarn install
cd ..

# Import database
./db import rlwm_db.sql.tgz rlwm_db

# initialize directus
cd directus
./run init

# copy directus configuration
cp env.directus.sample ./directus/_data/opt/app/.env
```

## Quick startup

```
# Run the api
./run api-dev

# Run the web interface
./run web-dev

# Run Directus - optional
./run dt-start
```

## Local dev URL access

* Web interface
http://localhost:5000

* API
http://localhost:5001/api/healthcheck

* Directus
http://localhost:5002/admin



## Backup database

```
./db export rlwm_db rlwm_db.sql.tgz
```