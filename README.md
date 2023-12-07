# rlwm

## Quick setup

### Install Docker if you don't have it already.

[Docker install](https://www.docker.com/get-started/)

```
# Copy sample configuration files
cp env.api.sample .env

# install node modules
cd api
yarn install

The next step depends on if you're using the ssg or ssr template
SSR:
cd ../web
yarn install

SSG:
cd ../web-ssg

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

# For the SSR Template, Run the web interface
./run ssr-dev

# For the SSG Template, Run the web interface
./run ssg-dev

# Run Directus - optional
./run dt-start
```

## Local dev URL access

- Web interface
  http://localhost:5003

- API
  http://localhost:5001/api/healthcheck

- Directus
  http://localhost:5002/admin

## Backup database

```
./db export rlwm_db rlwm_db.sql.tgz
```
