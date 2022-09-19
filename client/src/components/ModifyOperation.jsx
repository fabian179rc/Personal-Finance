import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import style from "../Styles/ModifyOperation.module.css";
import {
  getOperation,
  modifyOperation,
  stateModifyOperationModal,
} from "../redux/actions/operation";

export default function ModifyOperation({ operation_id, user_id }) {
  const dispatch = useDispatch();
  const operation = useSelector((state) => state.operation);
  const [input, setInput] = useState({
    concept: "",
    amount: 0,
    date: "",
  });

  useEffect(() => {
    dispatch(getOperation(operation_id));
  }, []);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function send(e) {
    e.preventDefault();
    let amountEgress = Number(input.amount);
    if (operation.type === "egress") amountEgress = -input.amount;
    let operationModified = {
      ...input,
      amount: amountEgress,
    };
    if (input.concept === "" && input.amount === 0 && input.date === "")
      return Swal.fire({
        background:
          "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
        color: "white",
        title: "Error",
        text: "Enter a data",
        icon: "error",
      });
    dispatch(modifyOperation(user_id, operation_id, operationModified));
    Swal.fire({
      background:
        "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
      color: "white",
      title: "Operation",
      text: "Modify successful",
      icon: "success",
    });
    dispatch(stateModifyOperationModal());
  }

  function close(e) {
    e.preventDefault();
    dispatch(stateModifyOperationModal());
  }

  return (
    <>
      <div className={style.container}>
        <form onSubmit={(e) => send(e)} className={style.form}>
          <center>Modify</center>
          <div>
            <label>Concept: </label>
            <input
              onChange={(e) => handleChange(e)}
              name="concept"
              type="text"
              min="3"
            ></input>
          </div>
          <div>
            <label>Amount: </label>
            <input
              onChange={(e) => handleChange(e)}
              name="amount"
              type="number"
              min="1"
            ></input>
          </div>
          <div>
            <label>Date: </label>
            <input onChange={(e) => handleChange(e)} name="date" type="date" />
          </div>
          <section className={style.sectionbutton}>
            <button onClick={(e) => close(e)} className={style.buttoncancel}>
              Cancel
            </button>
            <button type="submit" className={style.button}>
              Save
            </button>
          </section>
        </form>
      </div>
    </>
  );
}
