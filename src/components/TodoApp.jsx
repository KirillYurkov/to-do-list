import Button from "./Button";
import Task from "./Task";
import NewTaskForm from "./NewTaskForm";
import TaskCounter from "./TaskCounter";
import { useState, useEffect } from "preact/hooks";

const TodoApp = () => {
  const [tasks, setTask] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }
    let storage = window.localStorage.getItem("tasks");
    if (storage) {
      return JSON.parse(storage);
    }
    return [];
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const handleAddTask = (taskText) => {
    const newTask = {
      id: Date.now().toString(),
      text: taskText,
      isDone: false,
    };

    setTask((prevTasks) => {
      return [...prevTasks, newTask];
    });
  };

  const handleDeleteAllTasks = () => {
    setTask([]);
  };

  const handleDeleteTask = (taskId) => {
    setTask((prevTasks) => {
      return prevTasks.filter((task) => task.id !== taskId);
    });
  };

  const handleToggleTask = (taskId) => {
    setTask((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isDone: !task.isDone };
        }
        return task;
      });
    });
  };

  const doneTasks = tasks.filter((task) => {
    return task.isDone === true;
  });

  return (
    <div className="app">
      <h1 className="to-do__title">Список задач</h1>
      <NewTaskForm onAddTask={handleAddTask} />

      <TaskCounter doneTasks={doneTasks.length} allTasks={tasks.length} />

      <ul className="to-do__list">
        {tasks.map((task) => {
          return (
            <Task
              key={task.id}
              id={task.id}
              text={task.text}
              isDone={task.isDone}
              onDeleteTask={handleDeleteTask}
              onToggleTask={handleToggleTask}
            />
          );
        })}
      </ul>

      <Button
        className="btn btn--delete btn--delete-all"
        label="Удалить все задачи"
        onClick={handleDeleteAllTasks}
      />
    </div>
  );
};
export default TodoApp;
