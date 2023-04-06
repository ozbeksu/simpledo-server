## Instructions

### Install and Run

Clone repository and install. Repo already has a seeded sqlite databse, migrations and generated types ready to go.

```shell
git clone https://github.com/ozbeksu/simpledo-server
cd simpledo-server
yarn
cp .env.dev .env
```

After installion finishes run dev server:

```shell
yarn dev
```

Visiting `http://localhost:3000/graphql` address should show Apollo Studio.

### Developent

If you make any changes to `schema.graphql` file, you can generate new types with command:

```shell
yarn codegen
```

if you make any changes to any entities, you can generate new migration with command:

```shell
yarn migrate:generate ./src/db/migration/create_all_tables
yarn migrate:run
yarn seed:run
```

You can drop all schemas:

```shell
yarn schema:drop
```

Remove `dist` files:

```shell
yarn clean
```