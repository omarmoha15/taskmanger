document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('errorMessage');
    const registerErrorMessage = document.getElementById('registerErrorMessage');
    const loginContainer = document.getElementById('loginContainer');
    const registerContainer = document.getElementById('registerContainer');
    const todoContainer = document.getElementById('todoContainer');
    const taskFormContainer = document.getElementById('taskFormContainer');
    const logoutButton = document.getElementById('logoutButton');
    const showRegisterFormButton = document.getElementById('showRegisterForm');
    const showLoginFormButton = document.getElementById('showLoginForm');
  
    const users = JSON.parse(localStorage.getItem('users')) || {
      admin: { password: '1234', id: '', email: '' },
      test: { password: '1234', id: '', email: '' }
    };
  
    function login(username) {
      localStorage.setItem('currentUser', username);
      loginContainer.style.display = 'none';
      registerContainer.style.display = 'none';
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
      registerContainer.style.display = 'none';
      todoContainer.style.display = 'none';
    }
  
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      if (users[username] && users[username].password === password) {
        login(username);
      } else {
        errorMessage.textContent = 'Invalid username or password.';
        errorMessage.style.display = 'block';
      }
    });
  
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const username = document.getElementById('registerUsername').value;
      const id = document.getElementById('registerID').value;
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
  
      if (users[username]) {
        registerErrorMessage.textContent = 'Username already exists.';
        registerErrorMessage.style.display = 'block';
      } else {
        users[username] = { password, id, email };
        localStorage.setItem('users', JSON.stringify(users));
        registerErrorMessage.textContent = 'Registration successful. Please log in.';
        registerErrorMessage.style.color = 'green';
        registerErrorMessage.style.display = 'block';
      }
    });
  
    showRegisterFormButton.addEventListener('click', () => {
      loginContainer.style.display = 'none';
      registerContainer.style.display = 'block';
    });
  
    showLoginFormButton.addEventListener('click', () => {
      registerContainer.style.display = 'none';
      loginContainer.style.display = 'block';
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
  