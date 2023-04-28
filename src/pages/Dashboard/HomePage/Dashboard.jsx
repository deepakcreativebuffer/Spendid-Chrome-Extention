import React from 'react';
import Header from '../../../component/UI/MainHeader/Header';
import classes from './Dashboard.module.css';
// import { useSelector } from 'react-redux';
// import { setSession } from '../../../utlis/auth';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  // const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // console.log(user);
  // const token = user?.access_token;
  // console.log(token);
  // setSession(token);

  const startFormHandler = () => {
    navigate('/form');
  };

  return (
    <>
      <Header />
      <div className={classes.main_content}>
        <div>
          <p>Onboarding interview</p>
          <button onClick={startFormHandler} className={classes.start}>
            Start
          </button>
        </div>
        <div>
          <p>
            To Bypass the Onboarding Interview and go directly to the App, click
            here
          </p>
          <button className={classes.byPass}> ByPass</button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
