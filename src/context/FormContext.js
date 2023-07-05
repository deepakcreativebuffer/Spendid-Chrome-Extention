import { createContext, useState } from 'react';
import {
  getStructureTransform,
  copyAndMultiplyBudget,
  copyAndMultiplyDemographics,
} from '../utlis/Helper';
import { transformerData } from '../utlis/HelperData';
import {
  zipIcon,
  ageIcon,
  HouseHoldIcon,
  homeTypeIcon,
  rentIcon,
  vehicleIcon,
  obligationIcon,
  healthcareIcon,
  incomeIcon,
} from '../utlis/Imports';

const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  const transformData = getStructureTransform(transformerData);
  const [netIncome, setNetIncome] = useState([{ frequency: '', amount: '' }]);

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

  const [globalSelectedIndex, setGlobalSelectedIndex] = useState(
    Array(10).fill(-1)
  );
  const [activeTabNumber, setActiveTabNumber] = useState('');
  // console.log('activeTabNumber', activeTabNumber);

  const [page, setPage] = useState(0);

  const [chartSvg, setChartSvg] = useState([]);
  const [scoreChart, setScoreChart] = useState('');
  const [barChart, setBarChart] = useState('');

  const [removeCategoryTableData, setRemoveCategoryTableData] = useState([]);
  // console.log('removeCategoryTableData', removeCategoryTableData);

  // const [majorExpensesSortedData, setMajorExpensesSortedData] = useState([]);

  // const [otherExpensesSortedData, setOtherExpensesSortedData] = useState([]);

  const [data, setData] = useState({
    apiReq: {
      demographics: {
        zip: 14001,
        age: 25,
        household_members: 1,
        is_homeowner: false,
        net_annual_income: 10000,
      },
      budget: {
        savings: null,
        other_debt_payments: 572,
        mortgage_and_rent: 952,
        vehicle_purchase_and_lease: 654,
        health_insurance: 10,
      },
    },
  });
  // console.log('Data>>>>>>>', data);
  const inputDemograpicData = copyAndMultiplyDemographics(data);
  const inputBudgetData = copyAndMultiplyBudget(data);
  const [value, setValue] = useState(
    data.apiReq.demographics.household_members
  );

  const lendingPayload = {
    budget: {
      ...inputBudgetData.apiReq.budget,
      // education: 0,
      // life_and_personal_insurance: 0,
      // personal_services: 0,
      // public_and_other_transportation: 0,
    },
    demographics: { ...inputDemograpicData.apiReq.demographics },
  };
  const demographicsPayload = {
    demographics: { ...inputDemograpicData.apiReq.demographics },
    transformer: {
      ...transformerData,
    },
  };
  const budgetPayload = {
    budget: { ...inputBudgetData.apiReq.budget },
    demographics: { ...inputDemograpicData.apiReq.demographics },
    transformer: {
      ...transformerData,
    },
  };

  const scorePayload = {
    demographics: { ...inputDemograpicData.apiReq.demographics },
    budget: { ...inputBudgetData.apiReq.budget },
  };

  const categoryInputHandler = (name, value) => {
    setData((data) => {
      const newData = { ...data };
      const { apiReq } = newData;
      // Handle specific key names
      switch (name) {
        case 'net_annual_income':
          apiReq.demographics[name] = +value;
          break;

        case 'other_debt_payments':
          apiReq.budget[name] = +value || null;
          break;

        case 'savings':
          apiReq.budget[name] = +value || null;
          break;

        case 'alcoholic_beverages':
        case 'food_home':
          apiReq.budget.alcoholic_beverages = Math.round(+value / 2);
          apiReq.budget.food_home = Math.round(+value / 2);
          break;

        case 'toys_and_hobbies':
        case 'fees_and_admissions':
          apiReq.budget.toys_and_hobbies = Math.round(+value / 2);
          apiReq.budget.fees_and_admissions = Math.round(+value / 2);
          break;

        case 'home_maintenance_and_repairs':
        case 'housekeeping_supplies':
        case 'other_household_expenses':
          apiReq.budget.home_maintenance_and_repairs = Math.round(+value / 3);
          apiReq.budget.housekeeping_supplies = Math.round(+value / 3);
          apiReq.budget.other_household_expenses = Math.round(+value / 3);
          break;

        case 'water_and_public_services':
        case 'natural_gas':
        case 'heating_fuels_other':
          apiReq.budget.water_and_public_services = Math.round(+value / 3);
          apiReq.budget.natural_gas = Math.round(+value / 3);
          apiReq.budget.heating_fuels_other = Math.round(+value / 3);
          break;

        case 'medical_services':
        case 'medical_supplies':
        case 'prescription_drugs':
          apiReq.budget.medical_services = Math.round(+value / 3);
          apiReq.budget.medical_supplies = Math.round(+value / 3);
          apiReq.budget.prescription_drugs = Math.round(+value / 3);
          break;

        // Handle other key names
        default:
          apiReq.budget[name] = +value;
          break;
      }

      return newData;
    });
  };
  console.log('Data>>>>>>Context', data);

  const formDataHandlerChange = (e, i) => {
    if (i !== -1) {
      globalSelectedIndex[page] = i;
    } else {
      globalSelectedIndex[page] = 0;
    }
    setGlobalSelectedIndex(globalSelectedIndex);

    const name = e.target.getAttribute('name');
    let value =
      e.target.value === undefined
        ? e.target.getAttribute('value')
        : e.target.value;

    setData((data) => {
      const newData = { ...data };
      const { apiReq } = newData;

      switch (name) {
        case 'zip':
        case 'age':
        case 'net_annual_income':
          apiReq.demographics[name] = +value;
          localStorage.setItem([name], +value);
          break;

        case 'other_debt_payments':
        case 'mortgage_and_rent':
        case 'vehicle_purchase_and_lease':
        case 'health_insurance':
          apiReq.budget[name] = +value;
          break;

        case 'household_members':
          apiReq.demographics[name] = +value;
          setTimeout(() => {
            setPage((prev) => prev + 1);
          }, 300);
          break;

        case 'is_homeowner':
          apiReq.demographics[name] = JSON.parse(value);

          setTimeout(() => {
            setPage((prev) => prev + 1);
          }, 300);
          break;

        case 'isHealthInsured':
          if (value === 'Yes') {
            setTimeout(() => {
              setPage((prev) => prev + 1);
            }, 300);
          } else if (value === 'No') {
            setTimeout(() => {
              setPage((prev) => prev + 2);
            }, 300);
          }
          break;

        case 'isOtherDept':
          if (value === 'Yes') {
            setTimeout(() => {
              setPage((prev) => prev + 1);
            }, 300);
          } else if (value === 'No') {
            setTimeout(() => {
              setPage((prev) => prev + 2);
            }, 300);
          }
          break;

        default:
          break;
      }

      return newData;
    });
  };

  const prevRedirectHome = page === 0;

  const nextHide = page === title.length - 1;

  const submitHide = page !== title.length - 1;

  const nextHandler = () => setPage((prev) => prev + 1);
  const prevHandler = () => setPage((prev) => prev - 1);
  const currentHandler = () => setPage((prev) => prev);

  return (
    <FormContext.Provider
      value={{
        title,
        page,
        setPage,
        data,
        setData,
        formDataHandlerChange,
        prevRedirectHome,
        nextHide,
        submitHide,
        nextHandler,
        prevHandler,
        currentHandler,
        categoryInputHandler,
        globalSelectedIndex,
        lendingPayload,
        budgetPayload,
        demographicsPayload,
        scorePayload,
        netIncome,
        setNetIncome,
        transformData,
        value,
        setValue,
        activeTabNumber,
        setActiveTabNumber,
        inputDemograpicData,
        inputBudgetData,
        chartSvg,
        setChartSvg,
        scoreChart,
        setScoreChart,
        barChart,
        setBarChart,
        removeCategoryTableData,
        setRemoveCategoryTableData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
