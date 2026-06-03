class Task {
   constructor(title, description, dueDate, priority) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.done = false;
      this.id = crypto.randomUUID();
   }
   toggleDone() {
      this.done = !this.done;
   }
}
