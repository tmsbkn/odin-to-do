export default class Project {
   constructor(name) {
      this.name = name;
      this.tasks = [];
      this.id = crypto.randomUUID();
   }

   addTask(task) {
      this.tasks.push(task);
   }
   removeTask(taskID) {
      //set tasks to any tasks that do not match the given taskID
      this.tasks = this.tasks.filter((task) => task.id !== taskID);
   }
   getTask(taskID) {
      return this.tasks.find((task) => task.id === taskID);
   }
}
