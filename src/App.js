import { NavBar } from "./components/NavBar";
import { ExpenseModal } from "./components/ExpenseModal";
import { BudgetModal } from "./components/BudgetModal";
import React, { useState, useRef, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import { CgCloseR } from "react-icons/cg";
const App = () => {
  const BudgetModalRef = useRef();
  const overlayRef = useRef();
  const expenseModalRef = useRef();
  const viewExpensesModalRef = useRef();
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [budget, setBudget] = useState("");
  const [rendered, setRendered] = useState(false);
  const selectRef = useRef();

  useEffect(() => {
    if (localStorage.getItem("budgets") && localStorage.getItem("expenses")) {
      setBudgets(JSON.parse(localStorage.getItem("budgets")));
      setExpenses(JSON.parse(localStorage.getItem("expenses")));
    }
  }, []);

  useEffect(() => {
    if (rendered) {
      localStorage.setItem("budgets", JSON.stringify(budgets));
      localStorage.setItem("expenses", JSON.stringify(expenses));
    } else {
      setRendered(true);
    }
  }, [expenses, budgets]);

  return (
    <Container>
      <NavBar
        overlayRef={overlayRef}
        BudgetModalRef={BudgetModalRef}
        selectRef={selectRef}
        expenseModalRef={expenseModalRef}
      />
      <div
        ref={overlayRef}
        onClick={(e) => {
          BudgetModalRef.current.classList.add("d-none");
          overlayRef.current.classList.add("d-none");
          expenseModalRef.current.classList.add("d-none");
          viewExpensesModalRef.current.classList.add("d-none");
        }}
        className="overlay d-none"
      ></div>
      <BudgetModal
        overlayRef={overlayRef}
        BudgetModalRef={BudgetModalRef}
        budgets={budgets}
        setBudgets={setBudgets}
      />
      <ExpenseModal
        selectValue={selectValue}
        setSelectValue={setSelectValue}
        selectRef={selectRef}
        setExpenses={setExpenses}
        expenses={expenses}
        budgets={budgets}
        overlayRef={overlayRef}
        expenseModalRef={expenseModalRef}
        setBudgets={setBudgets}
      />
      <div ref={viewExpensesModalRef} class="view__exspenses_modal d-none">
        <h2>
          Expenses - {budget}
          <Button
            variant="danger"
            onClick={() => {
              setExpenses(
                expenses.filter((expense) => expense.budget !== budget)
              );
            }}
          >
            Delete
          </Button>
        </h2>
        {expenses.filter((expense) => expense.budget === budget).length > 0 ? (
          expenses
            .filter((expense) => expense.budget === budget)
            .map((expense) => {
              return (
                <div id={expense.id} className="expense__div">
                  <h4>{expense.name}</h4>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "10px",
                    }}
                  >
                    <h4>${expense.amount}</h4>
                    <CgCloseR
                      onClick={(e) => {
                        setExpenses(
                          expenses.filter(
                            (exp) =>
                              exp.id !==
                              Number(e.target.parentNode.parentNode.id)
                          )
                        );
                      }}
                    />
                  </div>
                </div>
              );
            })
        ) : (
          <h3>there is not expenses</h3>
        )}
      </div>
      <div className="expensed__container ">
        {budgets.map((budget) => {
          return (
            <BudgetCard
              selectValue={selectValue}
              setSelectValue={setSelectValue}
              selectRef={selectRef}
              setBudget={setBudget}
              viewExpensesModalRef={viewExpensesModalRef}
              overlayRef={overlayRef}
              expenseModalRef={expenseModalRef}
              expenses={expenses}
              budgets={budgets}
              name={budget.name}
              max={budget.maxSpending}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default App;
