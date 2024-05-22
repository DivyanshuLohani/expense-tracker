import React, { Dispatch, useRef, useState } from "react";
import { ACTIONS } from "../reducers/expense";

export default function AddExpense(props: { dispatch: Dispatch<any> }) {
  const [name, setName] = useState<string>("");
  //   const [description, setDiscription] = useState<string>("");
  const [amount, setAmount] = useState<number>();
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!name || !amount || amount <= 0 || !date) return;

    props.dispatch({
      type: ACTIONS.ADD_EXPENSE,
      payload: {
        name,
        id: Date.now().toString(),
        description: null,
        amount,
        date: new Date(date),
      },
    });

    setName("");
    setAmount(0);
  };

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-2 w-full md:w-1/3"
      onSubmit={handleSubmit}
    >
      <h1 className="text=center text-3xl">Add Expense</h1>
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
        <div className="w-full">
          <button className="border-2 border-green-500 shadow-lg p-3 text-lg rounded-full w-full hover:bg-green-500 hover:text-white mt-4 transition-colors duration-150 -ml-3">
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
