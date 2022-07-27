import { Container, Button, Stack } from "react-bootstrap";
import React from "react";
export function NavBar({
  BudgetModalRef,
  overlayRef,
  expenseModalRef,
  selectRef,
}) {
  return (
    <Stack direction="horizontal" gap="2" className="mb-4 mt-2">
      <h1 className="me-auto">Budgets</h1>
      <Button
        variant="primary"
        onClick={() => {
          BudgetModalRef.current.classList.remove("d-none");
          overlayRef.current.classList.remove("d-none");
        }}
      >
        Add Budget
      </Button>
      <Button
        variant="outline-primary"
        onClick={() => {
          selectRef.current.value = "none";

          expenseModalRef.current.classList.remove("d-none");
          overlayRef.current.classList.remove("d-none");
        }}
      >
        Add Expense
      </Button>
    </Stack>
  );
}
