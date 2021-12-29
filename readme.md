# JAM with Me

It's just a great project.

## Start

To start the images up:

```bash
docker-compose up -d
```

To start and force building images:

```bash
docker-compose up --build -d
```

To stop it:

```bash
docker-compose down
```

To stop and delteting all postgres data:

```
docker-compose down --volume
```