import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import { string } from 'prop-types';

type FormElem = React.FormEvent<HTMLFormElement>;
// const todos = [];

interface ITodo {
  type: string;
  complete: boolean;
}

export default function App(): JSX.Element {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue('');
    console.log(todos);
  };

  const addTodo = (text: string) => {
    const newTodo: ITodo[] = [...todos, { type: text, complete: false }];
    setTodos(newTodo);
  };

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const deleteTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <Fragment>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        <button type="submit">Add Todo</button>
      </form>
      <section>
        <ul>
          {todos.map((td: ITodo, i: number) => (
            <Fragment key={i}>
              <div
                style={{ textDecoration: td.complete ? 'line-through' : '' }}
              >
                {td.type.toUpperCase()}
              </div>
              <button type="button" onClick={() => completeTodo(i)}>
                {td.complete ? 'Incomplete' : 'Complete'}
              </button>
              <button type="button" onClick={() => deleteTodo(i)}>
                Delete
              </button>
            </Fragment>
          ))}
        </ul>
      </section>
    </Fragment>
  );
}

const root = document.getElementById('app-root');
ReactDOM.render(<App />, root);
