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

    return `rgb(${color.join(",")})`;
  };

  const maxAmount = 1000; // Define the maximum amount to normalize the ratio
  const backgroundColor = calculateBackgroundColor(expense.amount, maxAmount);

  return (
    <div
      style={{ backgroundColor }}
      className="rounded-3xl px-5 py-3 flex-col cursor-pointer"
      onClick={() =>
        navigate(`/expense/${expense.id}`, {
          state: { expense },
        })
      }
    >
      <h2 className="text-2xl font-bold">{expense.name}</h2>

      <span>{formatDate(expense.date)}</span>

      <div className="text-right relative mt-[110px] text-2xl  md:text-4xl">
        {formatToIndianCurrency(expense.amount)}
      </div>
    </div>
  );
}
