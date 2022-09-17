import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUser } from "../redux/actions/user";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const id = "c96b32be-ccd3-4435-8a8c-e6764823ef6e";

  useEffect(() => {
    dispatch(getUser(id));
  }, []);

  const lastOperation = user.operations?.slice(-10);

  function newOperation(e) {
    e.preventDefault();
    console.log(e.target.value);
    //abrir modal
  }
  return (
    <>
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
            <label>Last Ten Operations:</label>
            {lastOperation?.map((operation, i) => (
              <ul key={i}>
                <li>
                  Concept: {operation.concept} Amount: {operation.amount} Date:{" "}
                  {operation.date}
                </li>
              </ul>
            ))}
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}
