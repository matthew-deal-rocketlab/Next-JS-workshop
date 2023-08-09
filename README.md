# rlwm


## Quick setup

```
# Copy sample configuration files
cp env.api.sample .env

# install node modules
cd api
yarn install
cd ../web
yarn install
cd ..

# Start database and initialize it
./db start
./db init
./db initdb .env

# initialize a directus docker container
# You can press Ctrl+C to stop the initial configuration once it starts prompting for
# database type with: Choose your database client
cd directus ; ./run init ; cd ..

# copy over sample directus .env file
cp env.directus.sample ./directus/_data/opt/app/.env

# Import database backup
./db import rlwm_db.sql.tgz rlwm_db
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
