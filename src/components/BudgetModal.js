import { Form } from "react-bootstrap";
import React from "react";
import { Button } from "react-bootstrap";

export function BudgetModal({
  BudgetModalRef,
  budgets,
  setBudgets,
  overlayRef,
}) {
  const BudgetSumbitHandler = (e) => {
    e.preventDefault();
    setBudgets([
      ...budgets,
      {
        id: Math.floor(Math.random() * 10000 + 1),
        name: e.target.children[1].children[1].value,
        maxSpending: e.target.children[2].children[1].value,
      },
    ]);
    BudgetModalRef.current.classList.add("d-none");
    overlayRef.current.classList.add("d-none");
    document.querySelectorAll("input").forEach((input) => (input.value = null));
  };
  return (
    <div ref={BudgetModalRef} className="budget__modal d-none">
      <Form onSubmit={BudgetSumbitHandler}>
        <h2>New Budget</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Budget Name</Form.Label>
          <Form.Control required type="text" placeholder="Enter Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Maximum Spending</Form.Label>
          <Form.Control required type="number" placeholder="number" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
