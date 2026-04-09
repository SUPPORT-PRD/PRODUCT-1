import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Todo {
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-to-do-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
})
export class ToDoList {
  newTodo = signal('');
  todos = signal<Todo[]>([]);

  addTodo() {
    if (this.newTodo().trim()) {
      this.todos.update(todos => [...todos, { text: this.newTodo().trim(), completed: false }]);
      this.newTodo.set('');
    }
  }

  toggleComplete(index: number) {
    this.todos.update(todos => {
      const updated = [...todos];
      updated[index].completed = !updated[index].completed;
      return updated;
    });
  }

  deleteTodo(index: number) {
    this.todos.update(todos => todos.filter((_, i) => i !== index));
  }
}
