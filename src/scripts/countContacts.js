import { getAllContacts } from '../scripts/getAllContacts.js';

export const countContacts = async () => {
  try {
    const contacts = await getAllContacts();
    return contacts.length;
  } catch (error) {
    console.error(error);
  }
};

console.log(await countContacts());
