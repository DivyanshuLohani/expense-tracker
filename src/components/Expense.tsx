import { Expense as IExpense } from "../interfaces";
import { formatDate } from "../utils/formatDate";
import formatToIndianCurrency from "../utils/formatCurrency";
import { useNavigate } from "react-router-dom";

export default function Expense(props: { expense: IExpense }) {
  const expense = props.expense;
  const navigate = useNavigate();

  const calculateBackgroundColor = (amount: number, maxAmount: number) => {
    const green = [34, 197, 94]; // RGB for green-500
    const red = [239, 68, 68]; // RGB for red-500

    const ratio = Math.min(amount / maxAmount, 1);
    const color = green.map((start, i) =>
      Math.round(start + ratio * (red[i] - start))
    );

    return `rgb(${color.join(",")}, 0.5)`;
  };

  const maxAmount = 10000;
  const backgroundColor = calculateBackgroundColor(expense.amount, maxAmount);

  return (
    <div
      className={`relative shadow-md rounded-lg p-4 min-h-56 transition-transform transform  z-10 hover:-translate-y-2 hover:shadow-lg cursor-pointer`}
      style={{ backgroundColor }}
      onClick={() =>
        navigate(`/expense/${expense.id}`, {
          state: { expense },
        })
      }
    >
      {/* <div className="absolute h-56 w-full -z-10 bg-black top-0 left-0 rounded-lg bg-opacity-10 hover:rotate-6 transition-transform duration-300"></div> */}
      <div className="text-xl font-bold mb-2">{expense.name}</div>
      <div className="mb-4">{formatDate(expense.date)}</div>
      <div className="mb-8">{expense.description}</div>
      <div className="absolute bottom-4 right-4 text-2xl">
        {formatToIndianCurrency(expense.amount)}
      </div>
    </div>
  );
}
