import React, { useRef, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
const BudgetCard = ({
  name,
  max,
  expenses,
  viewExpensesModalRef,
  overlayRef,
  setBudget,
  expenseModalRef,
  selectRef,
  selectValue,
  setSelectValue,
}) => {
  const coloredProgressBarRef = useRef();
  useEffect(() => {
    if (
      expenses
        .filter((e) => e.budget === name)
        .reduce((total, item) => {
          return total + Number(item.amount);
        }, 0) <= max
    ) {
      coloredProgressBarRef.current.style.width = `${
        (expenses
          .filter((e) => e.budget === name)
          .reduce((total, item) => {
            return total + Number(item.amount);
          }, 0) /
          max) *
        100
      }%`;
    } else {
      coloredProgressBarRef.current.style.backgroundColor = "red";
      coloredProgressBarRef.current.style.width = "100%";
    }
  }, [expenses]);

  const addExpenseHandler = (e) => {
    setSelectValue(name);
    selectRef.current.value = name;
    expenseModalRef.current.classList.remove("d-none");
    overlayRef.current.classList.remove("d-none");
  };
  return (
    <Card>
      <Card.Body>
        <Card.Title class="d-flex justify-content-between">
          <h3>{name}</h3>
          <p className="text-secondary">
            $
            {expenses
              .filter((e) => e.budget === name)
              .reduce((total, item) => {
                return total + Number(item.amount);
              }, 0)}
            /${max}
          </p>
        </Card.Title>
        <div className=" d-flex justify-content-center progress__bar">
          <div
            ref={coloredProgressBarRef}
            className="colored__progress_bar"
          ></div>
        </div>
        <div className="justify-content-end gap-2 d-flex">
          <Button
            onClick={addExpenseHandler}
            className="mt-4 "
            variant="outline-primary"
          >
            Add Expense
          </Button>
          <Button
            onClick={() => {
              setBudget(name);
              viewExpensesModalRef.current.classList.remove("d-none");
              overlayRef.current.classList.remove("d-none");
            }}
            className="mt-4 "
            variant="outline-secondary"
          >
            View Expenses
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BudgetCard;
