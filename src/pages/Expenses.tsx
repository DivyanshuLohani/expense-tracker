import React, {
  Dispatch,
  useEffect,
  useReducer,
  useState,
  useTransition,
} from "react";
import Expense from "../components/Expense";
import expenseReducer from "../reducers/expense";
import { Expense as IExpense } from "../interfaces";
import formatToIndianCurrency from "../utils/formatCurrency";
import AddExpense from "../components/AddExpense";

export default function Expenses() {
  const defaultState = JSON.parse(localStorage.getItem("expenses") ?? "[]");
  const [expenses, dispatch]: [IExpense[], Dispatch<any>] = useReducer(
    expenseReducer,
    defaultState
  );
  const [sortBy, setSortBy] = useState<string>("date");
  const [filterStartDate, setFilterStartDate] = useState<string>("");
  const [filterEndDate, setFilterEndDate] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [total, setTotal] = useState(0);
  const [displayed, setDisplayed]: [IExpense[], any] = useState([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      let t = 0;

      expenses.forEach((e: IExpense) => {
        t += e.amount;
      });
      setTotal(t);
    });
  }, [expenses]);

  useEffect(() => {
    const compareExpenses = (a: IExpense, b: IExpense) => {
      if (sortBy === "date") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === "amount") {
        return a.amount - b.amount;
      }
      return 0;
    };

    const compareDate = (v: IExpense) => {
      const startDate = new Date(filterStartDate);
      const endDate = new Date(filterEndDate);

      if (startDate > endDate) {
        return false;
      }

      const expenseDate = new Date(v.date);

      return (
        expenseDate.getTime() >= startDate.getTime() &&
        expenseDate.getTime() <= endDate.getTime()
      );
    };

    let sortedExpenses = [...expenses].sort(compareExpenses);

    if (filterStartDate && filterEndDate) {
      sortedExpenses = sortedExpenses.filter(compareDate);
    }

    if (search) {
      sortedExpenses = sortedExpenses.filter((v) =>
        v.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    startTransition(() => {
      setDisplayed(sortedExpenses);
    });
  }, [
    expenses,
    sortBy,
    startTransition,
    filterEndDate,
    filterStartDate,
    search,
  ]);

  return (
    <main className="flex p-10 flex-col gap-10 box-border">
      <h1 className=" text-5xl font-bold">Expense Tracker</h1>
      <div className="grid grid-cols-3 gap-10">
        <div className="flex flex-col gap-10">
          <div className="w-full">
            <label htmlFor="search" className="text-xl sr-only">
              Search
            </label>
            <input
              type="text"
              id="search"
              className="border-2 shadow-lg p-3 text-lg rounded-full w-full"
              placeholder="🔎 Search Transactions"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>

          <div className="flex gap-5">
            <div className="w-full">
              <label htmlFor="search" className="text-lg ">
                Sort By:
              </label>
              <select
                onChange={(e) => setSortBy(e.target.value)}
                value={sortBy}
                className="border-2 shadow-lg p-3 text-lg rounded-full w-full -ml-3"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
              </select>
            </div>
          </div>
          <div className="flex gap-5 flex-row">
            <div className="w-1/2">
              <label htmlFor="search" className="text-lg">
                Start Date
              </label>
              <input
                type="date"
                className="border-2 shadow-lg p-3 text-lg rounded-full w-full -ml-3"
                onChange={(e) => setFilterStartDate(e.target.value)}
                value={filterStartDate}
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="search" className="text-lg">
                End Date
              </label>
              <input
                type="date"
                className="border-2 shadow-lg p-3 text-lg rounded-full w-full -ml-3"
                onChange={(e) => setFilterEndDate(e.target.value)}
                value={filterEndDate}
              />
            </div>
          </div>
        </div>
        <div className="font-bold text-4xl">
          You've Spent{" "}
          <span className="text-5xl">
            {isPending ? "Loading..." : formatToIndianCurrency(total)}
          </span>
          <br />
          <span>in {expenses.length} transactions</span>
          {filterStartDate && filterEndDate && (
            <div>
              <button
                className="border-2 border-red-500 shadow-lg p-3 text-lg rounded-full w-full hover:bg-red-500 hover:text-white mt-4 transition-colors duration-150"
                onClick={() => {
                  setFilterStartDate("");
                  setFilterEndDate("");
                }}
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>
        <AddExpense dispatch={dispatch} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {displayed.map((e) => {
          return <Expense key={e.id} expense={e} />;
        })}
      </div>
    </main>
  );
}
