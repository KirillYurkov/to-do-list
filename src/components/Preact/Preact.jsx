import "@/components/Preact/_preact.scss";

const Preact = () => {
  console.log("terminal");
  const getButtonInfo = (e) => {
    console.log("Клик по кнопке");
    console.log(e.target);
    console.log(e.target.textContent);
    console.log(e.target.type);
  };
  let arr = [];
  for (let i = 0; i < 3; i++) {
    arr.push(<li>{i}</li>);
  }
  arr.push(<li>6</li>)
  return (
    <>
      <ul>{arr}</ul>
      <p>Hello</p>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>

      <button onclick={getButtonInfo} style="padding:10px">
        Btn
      </button>
    </>
  );
};
export default Preact;
