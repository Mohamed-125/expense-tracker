import { Form } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

export function ExpenseModal({
  expenseModalRef,
  budgets,
  overlayRef,
  setExpenses,
  expenses,
  selectRef,
  selectValue,
  setSelectValue,
}) {
  // const number =
  const expenseSumbitHandler = (e) => {
    e.preventDefault();
    if (!selectValue) {
      alert("choose budget");
    } else {
      setExpenses([
        ...expenses,
        {
          name: e.target.children[1].children[1].value,
          amount: e.target.children[2].children[1].value,
          budget: selectValue,
          id: Math.floor(Math.random() * 100044425645 + 1),
        },
      ]);
      document
        .querySelectorAll("input")
        .forEach((input) => (input.value = null));
      expenseModalRef.current.classList.add("d-none");
      overlayRef.current.classList.add("d-none");
      setSelectValue("");
    }
  };

  return (
    <div ref={expenseModalRef} className="expense__modal d-none">
      {budgets.length > 0 ? (
        <Form onSubmit={expenseSumbitHandler}>
          <h2>New Expense</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Expense Name</Form.Label>
            <Form.Control required type="text" placeholder="Enter Name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" required placeholder="number" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Category</Form.Label>
            <br></br>

            <select
              onChange={(e) => {
                setSelectValue(e.target.value);
              }}
              name="budget"
              ref={selectRef}
            >
              <option value="none" selected disabled>
                Select an Option
              </option>

              {budgets.map((bud) => {
                return (
                  <option value={bud.name} id={bud.id}>
                    {bud.name}
                  </option>
                );
              })}
            </select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      ) : (
        <h3 style={{ paddingBlock: "40px" }}>
          You Don't Have Any Budgets To Add Expenses To
        </h3>
      )}
    </div>
  );
}
