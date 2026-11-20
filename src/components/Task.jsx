import Button from "./Button";
const Task = (props) => {
  const {
    id,
    text,
    className = "",
    onDeleteTask,
    onToggleTask,
    isDone,
  } = props;

  return (
    <li className="to-do__item">
      <label htmlFor={`task-${id}`} />
      <input
        type="checkbox"
        name={`task-${id}`}
        id={id}
        checked={isDone}
        onChange={() => onToggleTask(id)}
      />
      <span className={`${isDone ? "to-do__text--done" : "to-do__text"}`}>
        {text}
      </span>
      <Button
        className="btn btn--delete"
        type="button"
        onClick={() => onDeleteTask(id)}
        label="Удалить"
      />
    </li>
  );
};
export default Task;
