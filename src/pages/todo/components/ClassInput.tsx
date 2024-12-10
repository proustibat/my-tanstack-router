import {MouseEvent, Component, ChangeEvent} from "react";
import Button from "./Button.jsx";

interface IProps {
  name: string
}

interface IState {
  todos: { value: string, temporaryValue: string }[],
  inputVal: string
}

class ClassInput extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      todos: [
        { value: "Youpi", temporaryValue: "" },
        { value: "Yep", temporaryValue: "" },
      ],
      inputVal: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditingInputChange = this.handleEditingInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleAdd(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if(this.state.inputVal.length === 0) {
      return;
    }
    this.setState((state) => {
      const newTodos = JSON.parse(JSON.stringify(state.todos));
      newTodos.push({
        value: state.inputVal,
        temporaryValue: "",
      });
      return {
        todos: newTodos,
        inputVal: "",
      };
    });
  }

  handleDelete = (index: number) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.filter((_task, i) => i !== index),
    }));
  };

  handleEdit = (index: number) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.setState((state) => {
      const newTodos = JSON.parse(JSON.stringify(state.todos));
      newTodos[index].isEditing = true;
      newTodos[index].temporaryValue = newTodos[index].value;
      return {
        ...state,
        todos: newTodos,
      };
    });
  };

  handleEditingInputChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    this.setState((state) => {
      const newTodos = JSON.parse(JSON.stringify(state.todos));
      newTodos[index].temporaryValue = e.target.value;
      return {
        ...state,
        todos: newTodos,
      };
    });
  };

  handleSave = (index: number) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.setState((state) => {
      const newTodos = JSON.parse(JSON.stringify(state.todos));
      newTodos[index].value = newTodos[index].temporaryValue;
      newTodos[index].temporaryValue = "";
      return {
        ...state,
        todos: newTodos,
      };
    });
  };

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        <form>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <Button type="submit" disabled={this.state.inputVal.length === 0} onClick={this.handleAdd}>Submit</Button>
        </form>

        <h4>
          All the tasks!<span>&nbsp;({this.state.todos.length})&nbsp;</span>
        </h4>
        <ul>
          {this.state.todos.map((todo, index) => (
            <li key={`${todo.value}-${index}`}>
              {todo.temporaryValue.length > 0 ? (
                <>
                  <input
                    type="text"
                    name={`editing-${index}`}
                    defaultValue={todo.value}
                    onChange={this.handleEditingInputChange(index)}
                  />
                  <Button onClick={this.handleSave(index)} type="button">
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <span>{todo.value}</span>
                  <Button onClick={this.handleEdit(index)} type="button">
                    Edit
                  </Button>
                </>
              )}

              <Button onClick={this.handleDelete(index)} type="button">
                delete
              </Button>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
