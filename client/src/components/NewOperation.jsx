import { useState } from "react";
import { useDispatch } from "react-redux";
import { newOperation, operationModal } from "../redux/actions/operation";
import Swal from "sweetalert2";
import style from "../Styles/NewOperation.module.css";
import style2 from "../Styles/Home.module.css";

export default function NewOperation({ typeinput, user_id }) {
  const dispatch = useDispatch();
  const [type, setType] = useState(typeinput);
  const [input, setInput] = useState({
    concept: "",
    amount: 0,
    date: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function send(e) {
    e.preventDefault();
    let amountEgress = Number(input.amount);
    if (type === "egress") amountEgress = -input.amount;
    let operation = {
      ...input,
      type,
      amount: amountEgress,
    };
    dispatch(newOperation(user_id, operation));
    Swal.fire({
      background:
        "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
      color: "white",
      title: "Operation",
      text: "Created successful",
      icon: "success",
    });
    dispatch(operationModal());
  }

  function close() {
    dispatch(operationModal());
  }

  function changeOperation(e) {
    e.preventDefault();
    type === "egress" ? setType("entry") : setType("egress");
  }

  function entry() {
    return (
      <>
        <label>New {type} operation </label>
        <button onClick={(e) => changeOperation(e)}>
          {type === "entry" ? "egress" : "entry"}
        </button>
      </>
    );
  }

  return (
    <>
      <div className={style.container}>
        <h2> {entry()}</h2>

        <form onSubmit={(e) => send(e)}>
          <div>
            <label>Concept: </label>
            <input
              onChange={(e) => handleChange(e)}
              name="concept"
              type="text"
              min="3"
              required
            ></input>
          </div>
          <div>
            <label>Amount: </label>
            <input
              onChange={(e) => handleChange(e)}
              name="amount"
              type="number"
              min="1"
              required
            ></input>
          </div>
          <div>
            <label>Date: </label>
            <input
              onChange={(e) => handleChange(e)}
              name="date"
              type="date"
              required
            />
          </div>
          <button
            onClick={(e) => close(e)}
            className={style2.buttonOperationEgress}
          >
            Cancel
          </button>
          <button type="submit" className={style2.buttonOperationEntry}>
            Save
          </button>
        </form>
      </div>
    </>
  );
}
