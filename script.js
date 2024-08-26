'use strict'

const myLibrary = [];

// Constructor function for Book
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read; // Assume 'read' is a boolean indicating if the book has been read
}

// Function to display books in the table
function displayBooks() {
  const tableBody = document.querySelector('#libraryTable tbody');
  if (!tableBody) {
    console.error("Table body element not found");
    return;
  }
  
  tableBody.innerHTML = ''; // Clear existing rows

  myLibrary.forEach((book, index) => {
    const row = document.createElement('tr');

    const titleCell = document.createElement('td');
    titleCell.textContent = book.title;
    row.appendChild(titleCell);

    const authorCell = document.createElement('td');
    authorCell.textContent = book.author;
    row.appendChild(authorCell);

    const pagesCell = document.createElement('td');
    pagesCell.textContent = book.pages;
    row.appendChild(pagesCell);

    const readCell = document.createElement('td');
    readCell.textContent = book.read ? 'Yes' : 'No';
    row.appendChild(readCell);

    // Create a cell for action buttons
    const actionsCell = document.createElement('td');

    // Create and add the "Remove" button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.style.cssText = 'padding: 10px 15px; background-color: red; color: white; border: none; border-radius: 4px; cursor: pointer;'
    removeButton.addEventListener('click', () => {
      removeBook(index);
    });
    actionsCell.appendChild(removeButton);

    // Create and add the "Toggle Read Status" button
    const toggleReadButton = document.createElement('button');
    toggleReadButton.textContent = book.read ? 'Mark as Unread' : 'Mark as Read';
    toggleReadButton.style.cssText = 'padding: 10px 15px; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;';
    toggleReadButton.addEventListener('click', () => {
      toggleReadStatus(index);
    });
    actionsCell.appendChild(toggleReadButton);

    row.appendChild(actionsCell);
    tableBody.appendChild(row);
  });
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = parseInt(document.querySelector('#pages').value, 10);
  const read = document.querySelector('#read').checked;

  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);

  displayBooks();
  closeDialog();
}

// Function to create and show the dialog form
function createDialog() {
  const dialog = document.createElement('dialog');
  dialog.id = 'dialogForm';

  // Add basic styling to the dialog
  dialog.style.padding = '20px';
  dialog.style.border = '1px solid #ddd';
  dialog.style.borderRadius = '8px';
  dialog.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  dialog.style.width = '300px';
  dialog.style.maxWidth = '90%';
  dialog.style.backgroundColor = '#fff';

  const form = document.createElement('form');
  form.id = 'bookForm';
  form.addEventListener('submit', handleFormSubmit);

  // Add styles directly to the form
  form.style.display = 'flex';
  form.style.flexDirection = 'column';
  form.style.gap = '10px';

  form.innerHTML = `
    <label for="title">Title:</label>
    <input type="text" id="title" name="title" required style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
    
    <label for="author">Author:</label>
    <input type="text" id="author" name="author" required style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
    
    <label for="pages">Number of Pages:</label>
    <input type="number" id="pages" name="pages" required style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
    
    <label for="read">Have you read this book?</label>
    <input type="checkbox" id="read" name="read" style="margin-top: 5px;">
    
    <div style="display: flex; justify-content: space-between; gap: 10px;">
      <button type="submit" style="padding: 10px 15px; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Add Book</button>
      <button type="button" id="closeDialog" style="padding: 10px 15px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">Cancel</button>
    </div>
  `;

  dialog.appendChild(form);
  document.body.appendChild(dialog);

  // Handle dialog visibility
  document.querySelector('#newBookButton').addEventListener('click', () => {
    dialog.showModal(); // Show the dialog when the button is clicked
  });

  document.querySelector('#closeDialog').addEventListener('click', () => {
    closeDialog(); // Close the dialog when the cancel button is clicked
  });
}

// Function to close the dialog
function closeDialog() {
  const dialog = document.querySelector('#dialogForm');
  if (dialog) {
    dialog.close(); // Close the dialog
  } else {
    console.error("Dialog element not found");
  }
}

// Function to remove a book from the library
function removeBook(index) {
  if (index > -1 && index < myLibrary.length) {
    myLibrary.splice(index, 1);
    displayBooks();
  } else {
    console.error("Index out of range");
  }
}

// Function to toggle the read status of a book
function toggleReadStatus(index) {
  if (index > -1 && index < myLibrary.length) {
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks();
  } else {
    console.error("Index out of range");
  }
}

// Initialize event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  createDialog();
  displayBooks(); // Display any existing books on page load
});
