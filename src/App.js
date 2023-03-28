// router
import { Route, Routes } from "react-router-dom"
// pages
import Payment from "./pages/Payment";
import Expense from "./pages/Expense";
import PaymentEdits from "./components/Edit/PaymentsEdit";
// styles
import "../src/main.css"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Payment />} />
      <Route path="/expense" element={<Expense/>}/>
      <Route path="/paymentedits" element={<PaymentEdits/>}/>

    </Routes>
  )

}

export default App;
