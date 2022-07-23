import { Storage } from "./storage/storage";

const storage = new Storage({
    storage: localStorage
  });
export {  storage}