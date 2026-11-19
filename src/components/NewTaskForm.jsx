
import Button from './Button';
import { useState, useEffect } from 'preact/hooks';
const NewTaskForm = (props) => {
  
  const { name, label, text, onAddTask, ...rest } = props;
  const [value, setValue] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim().length === 0) { return; }
    onAddTask(value);
    setValue('');
  }
  
  
  return (
    <div>
      <form className='to-do__form' onSubmit={handleSubmit}>
        <input type='text' name={name} value={value} onChange={(e)=>setValue(e.target.value)}/>
        <Button className='btn btn--add' type='submit' label="New task" {...rest}/>
      </form>
      
    </div>
  )
}

export default NewTaskForm;