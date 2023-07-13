# rlwm


## Quick setup

```
# Copy sample configuration files
cp env.sample .env
cp env.directus.sample ./directus/.env

# initialize and configur directus
cd directus
./run init
./run config

# Note down you admin name and password
```

## Quick startup

```
# Run the api
./run api-dev

# Run Directus
cd directus ; ./run start ; cd ..

```