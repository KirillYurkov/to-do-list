const TaskCounter = (props) => {
  const { doneTasks, allTasks } = props;
  return (
    <div className="to-do__counter">
      Сделано {doneTasks} задач из {allTasks}
    </div>
  );
};
export default TaskCounter;
