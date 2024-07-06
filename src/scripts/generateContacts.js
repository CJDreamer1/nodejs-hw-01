import { PATH_DB } from '../constants/contacts.js';
import * as fs from 'node:fs/promises';
import { createFakeContact } from '../utils/createFakeContact.js';

export const generateContacts = async (number) => {
  try {
    // стоврення зовнішньої конструкції try...catch
    let data; // створення змінної data
    try {
      data = await fs.readFile(PATH_DB, 'utf8');
    } catch (error) {
      if (error.code === 'ENOENT') {
        data = '[]';
      }
    }

    let contacts;
    try {
      contacts = JSON.parse(data);
    } catch (error) {
      console.error('error parsing JSON', error);
      contacts = [];
    }

    for (let i = 0; i < number; i += 1) {
      contacts.push(createFakeContact());
    }

    await fs.writeFile(PATH_DB, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error(error);
    // створення зовнішнього блоку catch
  }
};

generateContacts(5);
