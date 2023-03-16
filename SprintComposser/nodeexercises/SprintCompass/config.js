import { config } from "dotenv";
config();
export const PROJECTCOLLECTION = process.env.PROJECTCOLLECTION;
export const atlas = process.env.DBURL;
export const appdb = process.env.DB;
export const db = process.env.DB;
export const port = process.env.PORT;
