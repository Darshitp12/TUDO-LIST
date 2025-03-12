# To-Do List App

## Overview
This is a simple To-Do List application that allows users to add, update, delete, and mark tasks as completed. The app provides a clean, responsive UI and saves tasks locally using `localStorage`, ensuring persistence across sessions.

## Features
- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Persist tasks using `localStorage`
- Responsive design for mobile and desktop users

## Technologies Used
- HTML
- CSS
- JavaScript (Vanilla JS)
- `localStorage` for data persistence

## Installation & Usage
1. Download or clone this repository.
2. Open `TODO_LIST.html` in a web browser.
3. Start adding, editing, and managing tasks.

## File Structure
```
📂 To-Do App
│── TODO_LIST.html  # Main HTML file
│── style.css       # Stylesheet
│── script.js       # JavaScript logic
│── README.md       # Documentation (this file)
```

## How It Works
1. **Adding Tasks**
   - Enter a task in the input field and click the "Add" button (or press Enter).
2. **Editing Tasks**
   - Click the "Edit" button next to a task to modify it.
   - Click "Save" after editing.
3. **Deleting Tasks**
   - Click the "Delete" button to remove a task.
4. **Marking Tasks as Completed**
   - Click the checkbox to toggle completion status.
5. **Persistent Storage**
   - Tasks are automatically saved to `localStorage` and reloaded when the page is refreshed.

## Responsive Design
- Uses CSS flexbox and media queries for a smooth experience on all screen sizes.

## Future Enhancements
- Implement drag-and-drop reordering.
- Add categories and due dates.
- Sync tasks with a backend database.

## License
This project is open-source and free to use under the MIT License.

