import React from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
const Obligations = () => {
  const { data, handleChange } = useFormContext();

  const content = (
    <div className={classes.questions}>
      <div className={classes.question}>
        <span>7.</span>
        <p>Any Other Monthly Debt Payments?</p>
      </div>
      <div className={classes.description}>
        <span>
          (exclude things such as garnishments that are already taken out of
          your pay )
        </span>
      </div>
      <div className={classes.select_option}>
        <div className={classes.option}>
          <p>A</p>
          <p>Yes</p>
        </div>
        <div className={classes.option}>
          <p>B</p>
          <p>No</p>
        </div>
      </div>
    </div>
  );

  return content;
};

export default Obligations;
