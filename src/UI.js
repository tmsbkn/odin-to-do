import App from './app.js';

const UI = (() => {
   // Render Projects in Sidebar

   const renderSidebar = () => {
      const list = document.querySelector('#project-list');
      list.innerHTML = '';
      App.getProjects().forEach((project) => {
         const span = document.createElement('span');
         span.textContent = project.name;
         span.dataset.id = project.id;
         if (project.id === App.getActiveProject().id) span.classList.add('active');

         const deleteBtn = document.createElement('button');
         deleteBtn.textContent = 'x';
         deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (App.getProjects().length === 1) return;
            App.deleteProject(project.id);
            render();
         });

         span.appendChild(deleteBtn);
         span.addEventListener('click', () => {
            App.setActiveProject(project.id);
            render();
         });
         list.appendChild(span);
      });
   };

   const renderTasks = () => {
      const container = document.querySelector('#task-list');
      container.innerHTML = '';
      const active = App.getActiveProject();

      document.querySelector('#project-title').textContent = active.name;

      active.tasks.forEach((task) => {
         const div = document.createElement('div');
         div.classList.add('task-item', `priority-${task.priority}`);
         if (task.done) div.classList.add('done');
         div.dataset.id = task.id;

         div.innerHTML = `
         <input type="checkbox" ${task.done ? 'checked' : ''}>
         <div>
         <span class="task-title">${task.title}</span>
         <span class="task-due">${task.dueDate}</span>
         <span class="task-desc">${task.description}</span>
         </div>
         <button class="btn-delete-task">X</button>
         `;

         div.querySelector('input[type="checkbox"]').addEventListener(
            'change',
            () => {
               App.toggleTask(task.id);
               render();
            },
         );

         div.querySelector('.btn-delete-task').addEventListener('click', () => {
            App.deleteTask(task.id);
            render();
         });
         container.appendChild(div);
      });
   };

   const render = () => {
      renderSidebar();
      renderTasks();
   };

   const bindEvents = () => {
      //Accent Colour Picker
      document
         .querySelector('#accentColorPicker')
         .addEventListener('change', (e) => {
            const root = document.querySelector(':root');
            root.style.setProperty('--color-accent', e.target.value);
         });

      // Add Project
      document.querySelector('#btn-add-project').addEventListener('click', () => {
         const name = prompt('Project Name:');
         if (name && name.trim()) {
            App.addProject(name.trim());
            render();
         }
      });

      document.querySelector('#btn-add-task').addEventListener('click', () => {
         showTodoModal();
      });

      document.querySelector('#task-form').addEventListener('submit', (e) => {
         e.preventDefault();
         const title = document.querySelector('#task-title').value;
         const desc = document.querySelector('#task-desc').value;
         const dueDate = document.querySelector('#task-due').value;
         const priority = document.querySelector('#task-priority').value;
         App.addTask(title, desc, dueDate, priority);
         hideTodoModal();
         render();
      });

      const showTodoModal = () => {
         document.querySelector('#task-modal').classList.remove('hidden');
      };
      const hideTodoModal = () => {
         document.querySelector('#task-modal').classList.add('hidden');
         document.querySelector('#task-form').reset();
      };
   };

   const init = () => {
      bindEvents();
      render();
   };

   return { init };
})();

export default UI;
