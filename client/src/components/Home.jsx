import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUser } from "../redux/actions/user";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);
  const id = "73eaee9e-0c2a-4f4c-900e-6a5f0b002f75";
  useEffect(() => {
    dispatch(getUser(id));
  }, []);

  return (
    <>
      <div>Balance {user.balance}</div>
    </>
  );
}
