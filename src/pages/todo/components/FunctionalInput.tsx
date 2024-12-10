import {MouseEvent, ChangeEvent, ReactElement, useState} from "react";
import Button from "./Button.jsx";

interface IProps {
  name: string
}

interface ITask { value: string, temporaryValue: string };

const FunctionalInput = ({ name }: IProps): ReactElement => {
  const [todos, setTodos] = useState<ITask[]>([
    { value: "Just some demo tasks", temporaryValue: "" },
    { value: "As an example", temporaryValue: "" },
  ]);
  const [inputVal, setInputVal] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const handleAdd = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(inputVal.length === 0) {
      return;
    }
    setTodos((todos) => {
      const newTodos = JSON.parse(JSON.stringify(todos));
      newTodos.push({
        value: inputVal,
        temporaryValue: "",
      });
      return newTodos;
    });
    setInputVal("");
  };

  const handleDelete = (index: number) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTodos(() => todos.filter((_task, i) => i !== index));
  };

  const handleEdit = (index: number) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTodos((todos) => {
      const newTodos = JSON.parse(JSON.stringify(todos));
      newTodos[index].isEditing = true;
      newTodos[index].temporaryValue = newTodos[index].value;
      return newTodos;
    });
  };

  const handleEditingInputChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    setTodos((todos) => {
      const newTodos = JSON.parse(JSON.stringify(todos));
      newTodos[index].temporaryValue = e.target.value;
      return newTodos;
    });
  };

  const handleSave = (index: number) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTodos((todos) => {
      const newTodos = JSON.parse(JSON.stringify(todos));
      newTodos[index].value = newTodos[index].temporaryValue;
      newTodos[index].temporaryValue = "";
      return newTodos;
    });
  };

  return (
    <section>
      <h3>{name}</h3>
      <form>
        <label htmlFor="task-entry">Enter a task: </label>
        <input
          type="text"
          name="task-entry"
          value={inputVal}
          onChange={handleInputChange}
        />
        <Button type="submit" disabled={inputVal.length===0} onClick={handleAdd}>Submit</Button>
      </form>

      <h4>
        All the tasks!<span>&nbsp;({todos.length})&nbsp;</span>
      </h4>
      <ul>
        {todos.map((todo, index) => (
          <li key={`${todo.value}-${index}`}>
            {todo.temporaryValue.length > 0 ? (
              <>
                <input
                  type="text"
                  name={`editing-${index}`}
                  defaultValue={todo.value}
                  onChange={handleEditingInputChange(index)}
                />
                <Button onClick={handleSave(index)} type="button">
                  Save
                </Button>
              </>
            ) : (
              <>
                <span>{todo.value}</span>
                <Button onClick={handleEdit(index)} type="button">
                  Edit
                </Button>
              </>
            )}
            <Button onClick={handleDelete(index)} type="button">
              delete
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FunctionalInput;
