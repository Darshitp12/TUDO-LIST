  // DOM elements
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');
  const tasksCountEl = document.getElementById('tasks-count');
  const completedCountEl = document.getElementById('completed-count');
  
  // App state
  let tasks = [];
  let editingId = null;
  
  // Initialize app
  document.addEventListener('DOMContentLoaded', () => {
      // Load tasks from localStorage
      loadTasks();
      
      // Add event listeners
      addTaskBtn.addEventListener('click', addTask);
      taskInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') addTask();
      });
      
      // Update statistics
      updateStats();
  });
  
  // CRUD Functions
  
  // Create
  function addTask() {
      const taskText = taskInput.value.trim();
      
      if (taskText === '') return;
      
      const newTask = {
          id: Date.now().toString(),
          text: taskText,
          completed: false,
          createdAt: new Date()
      };
      
      tasks.push(newTask);
      saveTasks();
      renderTasks();
      updateStats();
      
      // Clear input
      taskInput.value = '';
      taskInput.focus();
  }
  
  // Read (Render)
  function renderTasks() {
      taskList.innerHTML = '';
      
      if (tasks.length === 0) {
          const emptyMessage = document.createElement('p');
          emptyMessage.textContent = 'No tasks yet. Add a task to get started!';
          emptyMessage.style.textAlign = 'center';
          emptyMessage.style.color = '#888';
          emptyMessage.style.padding = '1rem';
          taskList.appendChild(emptyMessage);
          return;
      }
      
      // Sort tasks: incomplete first, then by creation date (newest first)
      const sortedTasks = [...tasks].sort((a, b) => {
          if (a.completed !== b.completed) {
              return a.completed ? 1 : -1;
          }
          return new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      sortedTasks.forEach(task => {
          const taskItem = document.createElement('li');
          taskItem.classList.add('task-item');
          if (task.completed) {
              taskItem.classList.add('completed');
          }
          
          // Checkbox
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.classList.add('task-checkbox');
          checkbox.checked = task.completed;
          checkbox.addEventListener('change', () => toggleComplete(task.id));
          
          // Task text
          const taskText = document.createElement('div');
          taskText.classList.add('task-text');
          
          if (editingId === task.id) {
              taskText.contentEditable = true;
              taskText.classList.add('editable');
              taskText.textContent = task.text;
              setTimeout(() => {
                  taskText.focus();
                  // Set cursor at the end
                  const range = document.createRange();
                  const sel = window.getSelection();
                  range.selectNodeContents(taskText);
                  range.collapse(false);
                  sel.removeAllRanges();
                  sel.addRange(range);
              }, 0);
          } else {
              taskText.textContent = task.text;
          }
          
          // Action buttons
          const taskActions = document.createElement('div');
          taskActions.classList.add('task-actions');
          
          if (editingId === task.id) {
              // Save button
              const saveBtn = document.createElement('button');
              saveBtn.classList.add('save-btn');
              saveBtn.textContent = 'Save';
              saveBtn.addEventListener('click', () => saveTask(task.id, taskText.textContent));
              
              taskActions.appendChild(saveBtn);
          } else {
              // Edit button
              const editBtn = document.createElement('button');
              editBtn.classList.add('edit-btn');
              editBtn.textContent = 'Edit';
              editBtn.addEventListener('click', () => startEditing(task.id));
              
              taskActions.appendChild(editBtn);
          }
          
          // Delete button
          const deleteBtn = document.createElement('button');
          deleteBtn.classList.add('delete-btn');
          deleteBtn.textContent = 'Delete';
          deleteBtn.addEventListener('click', () => deleteTask(task.id));
          
          taskActions.appendChild(deleteBtn);
          
          // Assemble task item
          taskItem.appendChild(checkbox);
          taskItem.appendChild(taskText);
          taskItem.appendChild(taskActions);
          
          taskList.appendChild(taskItem);
      });
  }
  
  // Update (Toggle complete)
  function toggleComplete(id) {
      tasks = tasks.map(task => {
          if (task.id === id) {
              return { ...task, completed: !task.completed };
          }
          return task;
      });
      
      saveTasks();
      renderTasks();
      updateStats();
  }
  
  // Update (Edit)
  function startEditing(id) {
      editingId = id;
      renderTasks();
  }
  
  function saveTask(id, newText) {
      const text = newText.trim();
      
      if (text === '') {
          deleteTask(id);
          return;
      }
      
      tasks = tasks.map(task => {
          if (task.id === id) {
              return { ...task, text };
          }
          return task;
      });
      
      editingId = null;
      saveTasks();
      renderTasks();
  }
  
  // Delete
  function deleteTask(id) {
      tasks = tasks.filter(task => task.id !== id);
      
      if (editingId === id) {
          editingId = null;
      }
      
      saveTasks();
      renderTasks();
      updateStats();
  }
  
  // Statistics
  function updateStats() {
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(task => task.completed).length;
      
      tasksCountEl.textContent = `Total: ${totalTasks} task${totalTasks !== 1 ? 's' : ''}`;
      completedCountEl.textContent = `Completed: ${completedTasks}`;
  }
  
  // Local Storage Functions
  function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function loadTasks() {
      const savedTasks = localStorage.getItem('tasks');
      
      if (savedTasks) {
          tasks = JSON.parse(savedTasks);
          renderTasks();
      }
  }