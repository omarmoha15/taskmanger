document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
  
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const taskName = document.getElementById('taskName').value;
      const taskTime = document.getElementById('taskTime').value;
      const taskNotes = document.getElementById('taskNotes').value;
  
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push({
        name: taskName,
        time: taskTime,
        notes: taskNotes
      });
  
      localStorage.setItem('tasks', JSON.stringify(tasks));
      loadTasks();
  
      taskForm.reset();
    });
  });
  
  function submitTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const submittedTasks = JSON.parse(localStorage.getItem('submittedTasks')) || [];
  
    submittedTasks.push(tasks[index]);
    tasks.splice(index, 1);
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('submittedTasks', JSON.stringify(submittedTasks));
    loadTasks();
  }
  
  function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  }
  