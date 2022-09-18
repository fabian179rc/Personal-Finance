import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/actions/user";
import NewOperation from "./NewOperation";
import ModifyOperation from "./ModifyOperation";
import Login from "./Login";
import style from "../Styles/Home.module.css";
// import useValidToken from "./useValidToken";
import {
  deleteOperation,
  operationModal,
  stateModifyOperationModal,
} from "../redux/actions/operation";

export default function Home() {
  // useValidToken({ navigate: true });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [valueBotton, setValueBotton] = useState();
  const [operationId, setOperationId] = useState();
  const [optionsProfile, setOptionsProfile] = useState(false);
  const { newOperationModal, modifyOperationModal } = useSelector(
    (state) => state
  );

  useEffect(() => {
    user.id && dispatch(getUser(user.id));
  }, [newOperationModal, modifyOperationModal]);

  const lastOperation = user.operations?.slice(-10);

  function newOperation(e) {
    e.preventDefault();
    setValueBotton(e.target.value);
    dispatch(operationModal());
  }

  function deleteOneOperation(e, operation_id) {
    e.preventDefault();
    dispatch(deleteOperation(user.id, operation_id));
  }

  function handleModifyOperation(e, operation_id) {
    e.preventDefault();
    setOperationId(operation_id);
    dispatch(stateModifyOperationModal());
  }

  function optionProfile(e) {
    e.preventDefault();
    setOptionsProfile(!optionsProfile);
  }
  function logOut() {}
  return (
    <>
      {newOperationModal && (
        <NewOperation typeinput={valueBotton} user_id={user.id} />
      )}
      {modifyOperationModal && (
        <ModifyOperation operation_id={operationId} user_id={user.id} />
      )}
      {Object.keys(user).length !== 0 ? (
        <div>
          <div className={style.containerImg}>
            <img
              className={style.imgProfile}
              src={user.img}
              alt="UserImg"
              onClick={(e) => optionProfile(e)}
            />
          </div>
          {optionsProfile && <button onClick={logOut}>Logout</button>}
          <div className={style.container}>
            <div>Balance: {user.balance}</div>
            <div className={style.buttons}>
              <button
                onClick={(e) => newOperation(e)}
                value="entry"
                className={style.buttonOperationEntry}
              >
                Entry
              </button>
              <button
                onClick={(e) => newOperation(e)}
                value="egress"
                className={style.buttonOperationEgress}
              >
                Egress
              </button>
            </div>
            <div>
              <p>Last Ten Operations:</p>
              {lastOperation?.length ? (
                lastOperation.map((operation, i) => (
                  <ul key={i}>
                    <li onClick={(e) => handleModifyOperation(e, operation.id)}>
                      Concept: {operation.concept} Amount: {operation.amount}{" "}
                      Date: {operation.date}
                    </li>
                    <button
                      onClick={(e) => deleteOneOperation(e, operation.id)}
                    >
                      Delete
                    </button>
                  </ul>
                ))
              ) : (
                <p>No operations</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
