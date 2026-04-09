import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoList } from './to-do-list';

describe('ToDoList', () => {
  let component: ToDoList;
  let fixture: ComponentFixture<ToDoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoList],
    }).compileComponents();

    fixture = TestBed.createComponent(ToDoList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty newTodo and empty todos array', () => {
    expect(component.newTodo()).toBe('');
    expect(component.todos()).toEqual([]);
  });

  describe('addTodo', () => {
    it('should add a new todo when newTodo has content', () => {
      component.newTodo.set('Test todo');
      component.addTodo();

      expect(component.todos()).toEqual([{ text: 'Test todo', completed: false }]);
      expect(component.newTodo()).toBe('');
    });

    it('should not add a todo when newTodo is empty', () => {
      component.newTodo.set('');
      component.addTodo();

      expect(component.todos()).toEqual([]);
    });

    it('should not add a todo when newTodo is only whitespace', () => {
      component.newTodo.set('   ');
      component.addTodo();

      expect(component.todos()).toEqual([]);
    });

    it('should trim whitespace from todo text', () => {
      component.newTodo.set('  Test todo  ');
      component.addTodo();

      expect(component.todos()).toEqual([{ text: 'Test todo', completed: false }]);
    });

    it('should add multiple todos', () => {
      component.newTodo.set('First todo');
      component.addTodo();
      component.newTodo.set('Second todo');
      component.addTodo();

      expect(component.todos()).toEqual([
        { text: 'First todo', completed: false },
        { text: 'Second todo', completed: false }
      ]);
    });
  });

  describe('toggleComplete', () => {
    beforeEach(() => {
      component.newTodo.set('Test todo');
      component.addTodo();
    });

    it('should toggle todo from incomplete to complete', () => {
      component.toggleComplete(0);

      expect(component.todos()[0].completed).toBe(true);
    });

    it('should toggle todo from complete to incomplete', () => {
      component.toggleComplete(0); // complete
      component.toggleComplete(0); // incomplete

      expect(component.todos()[0].completed).toBe(false);
    });

    it('should not affect other todos when toggling', () => {
      component.newTodo.set('Second todo');
      component.addTodo();

      component.toggleComplete(0);

      expect(component.todos()[0].completed).toBe(true);
      expect(component.todos()[1].completed).toBe(false);
    });
  });

  describe('deleteTodo', () => {
    beforeEach(() => {
      component.newTodo.set('First todo');
      component.addTodo();
      component.newTodo.set('Second todo');
      component.addTodo();
      component.newTodo.set('Third todo');
      component.addTodo();
    });

    it('should delete the first todo', () => {
      component.deleteTodo(0);

      expect(component.todos()).toEqual([
        { text: 'Second todo', completed: false },
        { text: 'Third todo', completed: false }
      ]);
    });

    it('should delete the middle todo', () => {
      component.deleteTodo(1);

      expect(component.todos()).toEqual([
        { text: 'First todo', completed: false },
        { text: 'Third todo', completed: false }
      ]);
    });

    it('should delete the last todo', () => {
      component.deleteTodo(2);

      expect(component.todos()).toEqual([
        { text: 'First todo', completed: false },
        { text: 'Second todo', completed: false }
      ]);
    });

    it('should handle deleting from empty array gracefully', () => {
      // Clear todos
      component.todos.set([]);

      expect(() => component.deleteTodo(0)).not.toThrow();
      expect(component.todos()).toEqual([]);
    });
  });

  describe('integration tests', () => {
    it('should handle complete workflow: add, toggle, delete', () => {
      // Add todos
      component.newTodo.set('Buy groceries');
      component.addTodo();
      component.newTodo.set('Walk dog');
      component.addTodo();

      expect(component.todos()).toEqual([
        { text: 'Buy groceries', completed: false },
        { text: 'Walk dog', completed: false }
      ]);

      // Toggle first todo to complete
      component.toggleComplete(0);
      expect(component.todos()[0].completed).toBe(true);
      expect(component.todos()[1].completed).toBe(false);

      // Delete completed todo
      component.deleteTodo(0);
      expect(component.todos()).toEqual([
        { text: 'Walk dog', completed: false }
      ]);

      // Toggle remaining todo
      component.toggleComplete(0);
      expect(component.todos()[0].completed).toBe(true);
    });
  });
});
