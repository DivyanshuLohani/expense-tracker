import { Expense } from "../interfaces";

export const ACTIONS = {
  ADD_EXPENSE: "add-expense",
  DELETE_EXPENSE: "delete-expense",
  EDIT_EXPENSE: `edit-expense`,
};

export default function reducer(state: Expense[], action: any) {
  switch (action.type) {
    case ACTIONS.ADD_EXPENSE:
      const s = [...state, action.payload];
      localStorage.setItem("expenses", JSON.stringify(s));
      return s;
  }
  return state;
}
