import React from "react";
import { Expense as IExpense } from "../interfaces";

import { CSVLink } from "react-csv";
import formatToIndianCurrency from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

export default function ExportExpenses(props: {
  expenses: IExpense[];
  start: string;
  end: string;
  search: string;
}) {
  const csvData = [
    ["Name", "Description", "Amount", "Date"],
    ...props.expenses.map((e) => {
      return [
        e.name,
        e.description ?? "",
        formatToIndianCurrency(e.amount),
        formatDate(e.date),
      ];
    }),
  ];

  let filename = "Expense Report";
  if (props.search) {
    filename = filename + ` Search ${props.search}`;
  }
  if (props.end && props.start) {
    const startDate = new Date(props.start);
    const startDateString = `${startDate.getDate()}-${startDate.getMonth()}-${startDate.getFullYear()}`;
    const endDate = new Date(props.end);
    const endDateString = `${endDate.getDate()}-${endDate.getMonth()}-${endDate.getFullYear()}`;

    filename = filename + ` From ${startDateString} - ${endDateString}`;
  }

  return (
    <CSVLink
      className="border-2 border-green-500 shadow-lg p-3 text-lg rounded-full w-full hover:bg-green-500 hover:text-white mt-4 transition-colors duration-150 block text-center"
      data={csvData}
      filename={filename}
    >
      Export
    </CSVLink>
    // <button className="border-2 border-red-500 shadow-lg p-3 text-lg rounded-full w-full hover:bg-red-500 hover:text-white mt-4 transition-colors duration-150">
    //   Export
    // </button>
  );
}
