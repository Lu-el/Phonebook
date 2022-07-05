import creatElements from './createElemenst.js';
import * as storage from './serviceStorage.js';

const {createRow} = creatElements;

const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  const objEvent = {
    handleEvent() {
      openModal();
    },
  };

  btnAdd.addEventListener('click', objEvent);

  formOverlay.addEventListener('click', (e) => {
    const target = e.target;
    if (target === formOverlay ||
      target.classList.contains('close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    if (e.target.closest('.del-icon')) {
      const phone = e.target.closest('.contact').phoneLink.textContent;
      storage.removeStorage(phone);
      e.target.closest('.contact').remove();
    }
  });
};

const addContactPage = (newContact, list, listHead) => {
  list.append(createRow(newContact));
  const btnDel = listHead.querySelector('.delete');
  if (btnDel.classList.contains('is-visible')) {
    list.querySelectorAll('.delete').forEach(btn => {
      if (!(btn.classList.contains('is-visible'))) {
        btn.classList.add('is-visible');
      }
    });
  }
};

const formControl = (form, list, listHead, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newContact = Object.fromEntries(formData);
    addContactPage(newContact, list, listHead);
    storage.addContactData(newContact, 'phonebook');
    form.reset();
    closeModal();
  });

  form.addEventListener('reset', e => {
    form.reset();
    closeModal();
  });
};

export default {
  modalControl,
  deleteControl,
  addContactPage,
  formControl,
};
