import React, { useEffect } from "react";

//Components
import { Sidebar } from "../Sidebar/Sidebar";

//jwt
import jwt from "jsonwebtoken";

//react router
import { Redirect } from "react-router-dom";

//Components
import { Navbar } from "../Navbar/Navbar";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../Redux/actions/user";


export const Dashboard = (): JSX.Element => {
  //redux
  const dispatch = useDispatch();
  const authenticated = useSelector(state => state.auth.authenticated);
  const userDetails = useSelector(state => state.user.user);

  //token
  let decodedToken;
  let userId;
  const token = localStorage.FBIdToken;

  if (token) {
    decodedToken = jwt.decode(token);
    userId = decodedToken.params && decodedToken.params.id;
  }

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  console.log(userDetails);

  if (!authenticated) {
    return <Redirect to="/register" />;
  }

  return (
    <>
      <div>
        <Navbar />
        <Sidebar userId={userId} />
      </div>
    </>
  );
};
