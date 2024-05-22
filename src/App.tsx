import { BrowserRouter, Routes, Route } from "react-router-dom";
import Expenses from "./pages/Expenses";
import EditExpense from "./pages/EditExpense";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/expense/:id/" element={<EditExpense />}></Route>
        <Route path="" element={<Expenses />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
