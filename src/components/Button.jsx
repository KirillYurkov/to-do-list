
const Button=(props)=>{
  let isAdd=false;
  const{label,...rest}=props;
  return(
    <div>
      <button className={`${isAdd?'btn--add':'btn--delete'}`} {...rest}>{label}</button>
    </div>
  )
}
export default Button;  

