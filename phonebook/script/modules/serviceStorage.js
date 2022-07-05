const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

const removeStorage = (phone) => {
  const data = getStorage('phonebook');
  const indexData = data.findIndex(elem => elem.phone === phone.toString());
  if (indexData >= 0) {
    data.splice(indexData, 1);
    localStorage.removeItem('phonebook');
    localStorage.setItem('phonebook', JSON.stringify(data));
  }
};

const setStorage = (key, newContact) => {
  const data = getStorage(key);
  data.push(newContact);
  localStorage.removeItem(key);
  localStorage.setItem(key, JSON.stringify(data));
};

const addContactData = (contact, key) => {
  setStorage(key, contact);
};

export default {
  getStorage,
  removeStorage,
  setStorage,
  addContactData,
};
