import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logOut } from "../redux/actions/user";
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
import Swal from "sweetalert2";

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
    Swal.fire({
      background:
        "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
      color: "white",
      title: "do you want to delete the operation?",
      showDenyButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteOperation(user.id, operation_id));
        Swal.fire({
          background:
            "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
          color: "white",
          title: "success",
          text: "Operation Deleted!",
          icon: "success",
        });
      }
    });
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
  function buttonlogOut(e) {
    dispatch(logOut());
    setOptionsProfile(!optionsProfile);
  }
  return (
    <>
      {newOperationModal && (
        <NewOperation typeinput={valueBotton} user_id={user.id} />
      )}
      {modifyOperationModal && (
        <ModifyOperation operation_id={operationId} user_id={user.id} />
      )}
      {Object.keys(user).length !== 0 ? (
        <div className={style.containerHome}>
          <img
            className={style.imgProfile}
            src={user.img}
            alt="UserImg"
            onClick={(e) => optionProfile(e)}
          />
          {optionsProfile && (
            <button onClick={(e) => buttonlogOut(e)} className={style.logout}>
              Logout
            </button>
          )}
          <div className={style.container}>
            <section className={style.section}>
              <span>Balance: $ {user.balance}</span>
              <div className={style.buttons}>
                <button
                  onClick={(e) => newOperation(e)}
                  value="entry"
                  className={style.buttonOperation}
                >
                  Entry
                </button>
                <button
                  onClick={(e) => newOperation(e)}
                  value="egress"
                  className={style.buttonOperation}
                >
                  Egress
                </button>
              </div>
            </section>
            <div className={style.operations}>
              <p className={style.operation}>Last Ten Operations:</p>
              {lastOperation?.length ? (
                lastOperation.map((operation, i) => (
                  <ul key={i} className={style.list}>
                    <li
                      onClick={(e) => handleModifyOperation(e, operation.id)}
                      className={style.li}
                    >
                      <span>Concept: {operation.concept}</span>{" "}
                      <span>Amount: {operation.amount} </span>
                      <span>
                        Date: {new Date(operation.date).toLocaleDateString()}
                      </span>
                    </li>
                    <button
                      onClick={(e) => deleteOneOperation(e, operation.id)}
                      className={style.buttonOperationdelete}
                    >
                      Delete
                    </button>
                  </ul>
                ))
              ) : (
                <p className={style.operation}>No operations</p>
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
