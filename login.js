document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const loginContainer = document.getElementById('loginContainer');
    const todoContainer = document.getElementById('todoContainer');
    const taskFormContainer = document.getElementById('taskFormContainer');
    const logoutButton = document.getElementById('logoutButton');
  
    const users = {
      admin: '1234',
      test: '1234'
    };
  
    function login(username) {
      localStorage.setItem('currentUser', username);
      loginContainer.style.display = 'none';
      todoContainer.style.display = 'block';
  
      if (username === 'admin') {
        taskFormContainer.style.display = 'block';
      } else {
        taskFormContainer.style.display = 'none';
      }
  
      loadTasks();
    }
  
    function logout() {
      localStorage.removeItem('currentUser');
      loginContainer.style.display = 'block';
      todoContainer.style.display = 'none';
    }
  
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      if (users[username] === password) {
        login(username);
      } else {
        errorMessage.textContent = 'Invalid username or password.';
        errorMessage.style.display = 'block';
      }
    });
  
    logoutButton.addEventListener('click', () => {
      logout();
    });
  
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      login(currentUser);
    }
  });
  
  function loadTasks() {
    const taskTable = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    const submittedTaskTable = document.getElementById('submittedTaskTable').getElementsByTagName('tbody')[0];
  
    taskTable.innerHTML = '';
    submittedTaskTable.innerHTML = '';
  
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task, index) => {
      const row = taskTable.insertRow();
      row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.time}</td>
      <td>${task.notes}</td>
      <td class="actions">
        <button onclick="submitTask(${index})">انجزت</button>
        <button class="delete" onclick="deleteTask(${index})">حذف</button>
      </td>
    `;
    });
  
    const submittedTasks = JSON.parse(localStorage.getItem('submittedTasks')) || [];
    submittedTasks.forEach(task => {
      const row = submittedTaskTable.insertRow();
      row.innerHTML = `
        <td>${task.name}</td>
        <td>${task.time}</td>
        <td>${task.notes}</td>
      `;
    });
  }
  