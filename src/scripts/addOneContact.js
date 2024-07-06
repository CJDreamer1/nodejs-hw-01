import * as fs from 'node:fs/promises';
import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';

export const addOneContact = async () => {
  await fs
    .readFile(PATH_DB, 'utf8')
    .then((data) => [...JSON.parse(data), createFakeContact()]) //тому тут парсимо JSON - і тепер це буде масивом а масив можна пушити
    .then((data) => fs.writeFile(PATH_DB, JSON.stringify(data, null, 2)))
    .catch((error) => console.error(error));
};

addOneContact();
//спочатку читаємо базу (вона прийде у формаі string(json))

//алгоритм наступний:
// 1) зчитуємо базу даних(fs.readFile('db.json', 'utf8'))
// 2) парсимо цей db.JSON - і в нас виходить масив
// 3) далі працюємо  зним як зі звичайним масивом (якщо знайти - find, filter, - якщо записати - push)
// 4)записуємо оновлений JSON в базу даних fs.writeFile('db.json', JSON.stringify(data, undefined, 2))
