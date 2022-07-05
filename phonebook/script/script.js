'use strict';

const {
  modalControl,
  deleteControl,
  formControl,
} = require('./modules/control');

const {
  renderPhoneBook,
  renderContacts,
} = require('./modules/render.js');

{
  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;
    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
      listHead,
    } = renderPhoneBook(app, title);

    // Сортировка

    const headers = listHead.querySelectorAll('th');

    const sortColumn = (index, tbody) => {
      const rows = tbody.querySelectorAll('.contact');
      const newRows = Array.from(rows);
      newRows.sort((rowA, rowB) => {
        const cellA = rowA.querySelectorAll('td')[index].innerHTML;
        const cellB = rowB.querySelectorAll('td')[index].innerHTML;

        switch (true) {
          case cellA > cellB: return 1;
          case cellA < cellB: return -1;
          case cellA === cellB: return 0;
        }
      });

      localStorage.setItem('sort', index);
      newRows.forEach(newRow => {
        tbody.appendChild(newRow);
      });
    };

    headers.forEach((header, index) => {
      header.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('sorting')) {
          sortColumn(index, list);
        }
      });
    });

    // Функционал

    const allRow = renderContacts(list, 'phonebook');
    const {closeModal} = modalControl(btnAdd, formOverlay);
    sortColumn(localStorage.getItem('sort'), list);

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, listHead, closeModal);
  };

  window.phoneBookInit = init;
}
