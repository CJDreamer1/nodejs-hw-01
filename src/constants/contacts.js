import * as fs from 'node:fs/promises';
import path from 'node:path';

export const PATH_DB = fs
  .readFile(path.resolve('src/db/db.json'))
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
