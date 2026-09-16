import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import CustomersPage from "./pages/CustomersPage";
import TransferPage from "./pages/TransferPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CustomersPage />} />
        <Route path="/transferencias" element={<TransferPage />} />
        <Route path="/historial" element={<TransactionHistoryPage />} />
      </Routes>
    </Layout>
  );
}
