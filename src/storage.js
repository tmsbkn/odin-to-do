import Project from './project.js';
import Task from './task.js';

const Storage = (() => {
   const save = (projects) => {
      localStorage.setItem('todoApp', JSON.stringify(projects));
   };
   const load = () => {
      const data = localStorage.getItem('todoApp');
      if (!data) return null;

      try {
         const parsed = JSON.parse(data);

         return parsed.map((projectData) => {
            const project = new Project(projectData.name);
            project.id = projectData.id;

            project.tasks = projectData.tasks.map((taskData) => {
               const task = new Task(
                  taskData.title,
                  taskData.description,
                  taskData.dueDate,
                  taskData.priority,
               );
               task.id = taskData.id;
               task.done = taskData.done;
               return task;
            });
            return project;
         });
      } catch (e) {
         console.warn('Storage Corrupted, resetting:', e);
         localStorage.removeItem('todoApp');
         return null;
      }
   };
   return { save, load };
})();

export default Storage;
