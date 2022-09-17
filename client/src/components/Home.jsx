import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOperation, operationModal } from "../redux/actions/operation";
import { getAllUsers, getUser } from "../redux/actions/user";
import NewOperation from "./NewOperation";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [valueBotton, setValueBotton] = useState();
  const user_id = "c96b32be-ccd3-4435-8a8c-e6764823ef6e";
  const newOperationModal = useSelector((state) => state.newOperationModal);

  useEffect(() => {
    dispatch(getUser(user_id));
  }, []);

  const lastOperation = user.operations?.slice(-10);

  function newOperation(e) {
    e.preventDefault();
    setValueBotton(e.target.value);
    dispatch(operationModal());
  }

  function deleteOneOperation(e, operation_id) {
    e.preventDefault();
    dispatch(deleteOperation(user_id, operation_id));
  }
  return (
    <>
      {newOperationModal && <NewOperation typeinput={valueBotton} />}
      {user ? (
        <div>
          <h1>Bienvenido {user.username}!</h1>
          <div>Balance: {user.balance}</div>
          <button onClick={(e) => newOperation(e)} value="entry">
            Entry
          </button>
          <button onClick={(e) => newOperation(e)} value="egress">
            Egress
          </button>
          <div>
            <p>Last Ten Operations:</p>
            {lastOperation?.length ? (
              lastOperation.map((operation, i) => (
                <ul key={i}>
                  <li>
                    Concept: {operation.concept} Amount: {operation.amount}{" "}
                    Date: {operation.date}
                    <button
                      onClick={(e) => deleteOneOperation(e, operation.id)}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              ))
            ) : (
              <p>No operations</p>
            )}
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}
