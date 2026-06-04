import Project from './project.js';
import Task from './task.js';
import Storage from './storage.js';

// App Function is what determines the logic that adds projects or changes the active project
const App = (() => {
   let projects = Storage.load() || [new Project('My Project')];
   let activeProjectID = projects[0].id;

   const getProjects = () => projects;

   const getActiveProject = () => projects.find((p) => p.id === activeProjectID);

   const setActiveProject = (id) => {
      activeProjectID = id;
   };

   const addProject = (name) => {
      const project = new Project(name);
      projects.push(project);
      Storage.save(projects);
      return project;
   };

   const deleteProject = (id) => {
      projects = projects.filter((projects) => projects.id !== id);
      Storage.save(projects);
   };

   const addTask = (title, description, dueDate, priority) => {
      const task = new Task(title, description, dueDate, priority);
      getActiveProject().addTask(task);
      Storage.save(projects);
      return task;
   };

   const deleteTask = (taskID) => {
      getActiveProject().removeTask(taskID);
      Storage.save(projects);
   };

   const toggleTask = (taskID) => {
      getActiveProject.getTask(taskID).toggleDone();
      Storage.save(projects);
   };

   return {
      getProjects,
      getActiveProject,
      setActiveProject,
      addProject,
      deleteProject,
      addTask,
      deleteTask,
      toggleTask,
   };
})();

export default App;
