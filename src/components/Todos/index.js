import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

const INITIAL_STATE = {
  todo: '',
};

class TodosBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      todos: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.todos().on('value', snapshot => {
      const todosObject = snapshot.val();

      const todosList = Object.keys(todosObject || {}).map(key => ({
        ...todosObject[key],
        todoid: key,
      }));

      this.setState({
        todos: todosList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.todos().off();
  }

  deleteTodo = todoid => {
    this.props.firebase.todo(todoid).remove();
  }

  render() {
    const { todos } = this.state;

    return (
      <div>
        <AddTodo />
        <h1>Todo list</h1>
        <TodoList todos={todos} deleteTodo={this.deleteTodo}/>
      </div>
    );
  }
}

const TodoList = ({ todos, deleteTodo }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.todoid}>
        {todo.todo}
        <button onClick={() => deleteTodo(todo.todoid)}>
          Delete
        </button>
      </li>
    ))}
  </ul>
);

class AddTodoBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    var newTodo = this.props.firebase.todos().push({
      created: new Date().toISOString().replace('T', ' ').replace('Z', ''),
      todo: this.state.todo,
    });
    this.setState({ ...INITIAL_STATE });
    event.preventDefault();
  }

  onChange = event => {
    this.setState({ todo: event.target.value });
  }

  render() {
    const { todo } = this.state;

    const invalid = todo.trim() === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="todo"
          value={todo}
          onChange={this.onChange}
          type="text"
          placeholder="Enter todo"
        />
        <button variant="contained" color="primary" disabled={invalid} type="submit">
          Add Todo
        </button>
      </form>
    );
  }
}

const AddTodo = compose(
  withFirebase,
)(AddTodoBase);

const Todos = compose(
  withFirebase,
)(TodosBase);

export default Todos;
