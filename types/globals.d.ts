import type { MongoClient } from "mongodb";

declare global {
  namespace NodeJS {
    export interface Global {
      mongo: {
        client?: MongoClient;
      };
    }
  }
}
