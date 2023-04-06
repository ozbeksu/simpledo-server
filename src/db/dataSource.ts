import "reflect-metadata";
import { DataSource } from "typeorm";
import options from "./../../ormconfig";

export const dataSource: DataSource = new DataSource(options);
