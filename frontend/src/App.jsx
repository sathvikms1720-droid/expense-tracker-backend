import { useEffect } from "react";
import API from "./services/api";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Dashboard from "./pages/Dashboard"
import ExpensesPage from "./pages/ExpensesPage"
import AnalyticsPage from "./pages/AnalyticsPage"
import ReportsPage from "./pages/ReportsPage"
import SettingsPage from "./pages/SettingsPage"


function App() {
useEffect(() => {
  testBackend();
}, []);

const testBackend = async () => {
  try {
    const res = await API.get("/");
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
  return (

    <BrowserRouter>

      <Routes>
    <Route
  path="/"
  element={<LoginPage />}
/>


        <Route
  path="/register"
  element={<RegisterPage />}
/>
<Route
  path="/login"
  element={<LoginPage />}
/>

        <Route
  path="/dashboard"
  element={<Dashboard />}
/>

        <Route
          path="/expenses"
          element={<ExpensesPage />}
        />

        <Route
          path="/analytics"
          element={<AnalyticsPage />}
        />
        <Route path="/reports" element={<ReportsPage />} />
         <Route
    path="/settings"
    element={<SettingsPage />}
  />

      </Routes>

    </BrowserRouter>

  )
}

export default App