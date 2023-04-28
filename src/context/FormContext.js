import { createContext, useState, useEffect } from 'react';
import zipIcon from '../assets/form/zipcode.png';
import ageIcon from '../assets/form/age.png';
import HouseHoldIcon from '../assets/form/household.png';
import homeTypeIcon from '../assets/form/hometype.png';
import rentIcon from '../assets/form/rent.png';
import vehicleIcon from '../assets/form/vehicle.png';
import obligationIcon from '../assets/form/obligation.png';
import healthcareIcon from '../assets/form/healthcare.png';
import incomeIcon from '../assets/form/income.png';
import classes from '../pages/Dashboard/Form/Form.module.css';

const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  const title = [
    {
      0: 'ZipCode',
      imageSrc: zipIcon,
    },
    {
      1: 'Age ',
      imageSrc: ageIcon,
    },
    {
      2: 'HouseHold',
      imageSrc: HouseHoldIcon,
    },
    {
      3: 'HomeType ',
      imageSrc: homeTypeIcon,
    },
    {
      4: 'Rent ',
      imageSrc: rentIcon,
    },
    {
      5: 'Vechicles ',
      imageSrc: vehicleIcon,
    },
    {
      6: 'Obligations ',
      imageSrc: obligationIcon,
    },
    {
      7: 'Obligations ',
      imageSrc: obligationIcon,
    },
    {
      8: 'Health Insurance ',
      imageSrc: healthcareIcon,
    },
    {
      9: 'Health Insurance ',
      imageSrc: healthcareIcon,
    },
    {
      10: 'Take Home ',
      imageSrc: incomeIcon,
    },
  ];

  const [page, setPage] = useState(0);

  const [data, setData] = useState({
    apiReq: {
      demographics: {
        zip: '',
        age: '',
        household_members: '',
        is_homeowner: '',
        net_annual_income: '',
      },
      budget: {
        other_debt_payments: '',
        mortgage_and_rent: '',
        vehicle_purchase_and_lease: '',
        health_insurance: '',
      },
    },
  });

  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.getAttribute('name'));
    console.log(e.target.value);
    console.log('value', e.target.getAttribute('value'));

    const name = e.target.getAttribute('name');
    const value =
      e.target.value === undefined
        ? e.target.getAttribute('value')
        : e.target.value;

    // console.log(name);
    // console.log(value);
    switch (name) {
      // case 'household_members':
      // case 'is_homeowner':
      case 'zip':
      case 'age':
      case 'net_annual_income':
        setData((data) => ({
          apiReq: {
            ...data.apiReq,
            demographics: {
              ...data.apiReq.demographics,
              [name]: value,
            },
          },
        }));
        break;

      case 'household_members':
      case 'is_homeowner':
        setData((data) => ({
          apiReq: {
            ...data.apiReq,
            demographics: {
              ...data.apiReq.demographics,
              [name]: value,
            },
          },
        }));
        setPage((prev) => prev + 1);
        break;

      case 'other_debt_payments':
      case 'mortgage_and_rent':
      case 'vehicle_purchase_and_lease':
      case 'health_insurance':
        setData((data) => ({
          apiReq: {
            ...data.apiReq,
            budget: {
              ...data.apiReq.budget,
              [name]: value,
            },
          },
        }));
        break;

      case 'isHealthInsured':
      case 'isOtherDept':
        if (value === 'Yes') {
          setPage((prev) => prev + 1);
        } else if (value === 'No') {
          setPage((prev) => prev + 2);
        }

        break;

      default:
      // ignore
    }
  };

  console.log('data>>>', data);

  const { takeHome, ...requiredInputs } = data;

  const canSubmit =
    [...Object.values(requiredInputs)].every(Boolean) &&
    page === title.length - 1;

  //TODO: When input is filled to required length and other condition when all input value is set for all page condition
  const canNextPage1 = Object.keys(data)
    .filter((key) => key.startsWith('bill') && key !== 'billAddress2')
    .map((key) => data[key])
    .every(Boolean);

  const canNextPage2 = Object.keys(data)
    .filter((key) => key.startsWith('ship') && key !== 'shipAddress2')
    .map((key) => data[key])
    .every(Boolean);

  const disablePrev = page === 0;

  const disableNext =
    page === title.length - 1 ||
    (page === 0 && !canNextPage1) ||
    (page === 1 && !canNextPage2);

  const prevRedirectHome = page === 0;

  const nextHide = page === title.length - 1;

  const submitHide = page !== title.length - 1;

  const okayNextHandler = () => setPage((prev) => prev + 1);
  const okayCurrentHander = () => setPage((prev) => prev);

  return (
    <FormContext.Provider
      value={{
        title,
        page,
        setPage,
        data,
        setData,
        canSubmit,
        handleChange,
        disablePrev,
        disableNext,
        prevRedirectHome,
        nextHide,
        submitHide,
        okayNextHandler,
        okayCurrentHander,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
