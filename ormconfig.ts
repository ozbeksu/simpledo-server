import {SeederOptions} from 'typeorm-extension';
import {DataSourceOptions} from 'typeorm';
// import {root} from './src/utils';

const options: DataSourceOptions & SeederOptions = {
  type: 'sqlite',
  database: 'etc/db.sqlite',
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/db/migration/**/*.ts'],
  seeds: ['src/db/seeds/**/*{.ts,.js}'],
  factories: ['src/db/factories/**/*{.ts,.js}'],
};

export default options;
