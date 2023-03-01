import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from './todo';
import { TodoService } from './todo-service';

@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: []
})
export class TodoListComponent implements OnInit {

  public serverFilteredTodos: Todo[];
  public filteredTodos: Todo[];

  public _id: string;
  public owner: string;
  public status: boolean;
  public body: string;
  public category: string;

  constructor(private todoService: TodoService, private snackBar: MatSnackBar) {

  }
  getTodosFromServer() {
    this.todoService.getTodo({
      _id: this._id,
      owner: this.owner,
      body: this.body,
      category: this.category,
      status: this.status
    }).subscribe(returnedTodos => {

      this.serverFilteredTodos = returnedTodos;
      this.updateFilter();
    }, err => {

      console.error('We couldn\'t get the list of todos; the server might be down');
      this.snackBar.open(
        'Problem contacting the server – try again',
        'OK',

        { duration: 3000 });
    });
  }

  public updateFilter() {
    this.filteredTodos = this.todoService.filterTodos(
      this.serverFilteredTodos, { _id: this._id, owner: this.owner, body: this.body, category: this.category }
    );
  }

  ngOnInit(): void {
    this.getTodosFromServer();
  }
}
