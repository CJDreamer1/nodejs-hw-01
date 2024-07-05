import { PATH_DB } from '../constants/contacts.js';
import * as fs from 'node:fs/promises';
import { createFakeContact } from '../utils/createFakeContact.js';

const generateContacts = async (number) => {
  try {
    // Читання існуючих контактів з файлу
    let data;
    try {
      data = await fs.readFile(PATH_DB, 'utf-8');
    } catch (error) {
      if (error.code === 'ENOENT') {
        // Якщо файл не існує, ініціалізуємо порожній масив
        data = '[]';
      } else {
        throw error;
      }
    }

    // Парсинг JSON
    let contacts;
    try {
      contacts = JSON.parse(data);
      if (!Array.isArray(contacts)) {
        throw new Error('JSON data is not an array');
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      contacts = [];
    }

    // Генерація нових контактів
    for (let i = 0; i < number; i++) {
      contacts.push(createFakeContact());
    }

    // Запис оновленого масиву контактів назад у файл
    await fs.writeFile(PATH_DB, JSON.stringify(contacts, null, 2));

    console.log(`Added ${number} new contacts.`);
  } catch (error) {
    console.error('Error generating contacts:', error);
  }
};
generateContacts(5);
