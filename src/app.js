import Project from './project';
import Task from './task';

// App Function is what determines the logic that adds projects or changes the active project
const App = (() => {
   let projects = Storage.load() || [new Project('My Project')];
   let activeProjectID = projects[0].id;

   const getProjects = () => projects;

   const getActiveProject = () =>
      projects.find((project) => projects.id === activeProjectID);

   const setActiveProject = (id) => {
      activeProjectID = id;
   };

   const addProject = (name) => {
      const project = new Project(name);
      projects.push(project);
      Storage.save(projects);
      return project;
   };
})();
