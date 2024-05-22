import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Expense as IExpense } from "../interfaces";

export default function EditExpense() {
  const location = useLocation();
  const expense: IExpense = location.state.expense;
  const navigate = useNavigate();
  if (!expense) {
    navigate("/");
  }
  const [name, setName] = useState<string>(expense.name);
  //   const [description, setDiscription] = useState<string>("");
  const [amount, setAmount] = useState<number>(expense.amount);
  const [date, setDate] = useState<string>(
    new Date(expense.date).toISOString().split("T")[0]
  );

  const expenses = JSON.parse(localStorage.getItem("expenses") ?? "[]");

  const handleEdit = () => {
    if (!name || !amount || amount <= 0 || !date) return;
    const updatedExpenses = expenses.map((e: IExpense) =>
      expense.id === e.id
        ? {
            ...e,
            name,
            amount,
            date,
          }
        : e
    );
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    navigate("/");
  };

  const handleDelete = () => {
    const updatedExpenses = expenses.filter(
      (e: IExpense) => expense.id !== e.id
    );
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-2 w-full px-40 justify-center h-svh">
      <h1 className="text=center text-3xl">Edit Expense</h1>
      <div className="w-full">
        <label htmlFor="search" className="text-xl ">
          Name
        </label>
        <input
          type="text"
          id="search"
          className="border-2 shadow-lg p-3 text-lg rounded-full w-full -ml-3 mt-1"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      <div className="flex gap-5">
        <div className="w-full">
          <label htmlFor="search" className="text-xl ">
            Amount
          </label>
          <input
            type="number"
            id="search"
            className="border-2 shadow-lg p-3 text-lg rounded-full w-full -ml-3 mt-1"
            placeholder="Amount"
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            value={amount}
          />
        </div>
      </div>
      <div className="flex gap-5 flex-row">
        <div className="w-full">
          <label htmlFor="search" className="text-lg">
            Expense Date
          </label>
          <input
            type="date"
            className="border-2 shadow-lg p-3 text-lg rounded-full w-full -ml-3"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </div>
      </div>
      <div className="flex gap-5 flex-row mt-3">
        <button
          onClick={(e) => handleDelete()}
          className="border-2 border-red-500 shadow-lg p-3 text-lg rounded-full w-full hover:bg-red-500 hover:text-white mt-4 transition-colors duration-150 -ml-3"
        >
          Delete
        </button>
        <button
          onClick={(e) => handleEdit()}
          className="border-2 border-green-500 shadow-lg p-3 text-lg rounded-full w-full hover:bg-green-500 hover:text-white mt-4 transition-colors duration-150 -ml-3"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
