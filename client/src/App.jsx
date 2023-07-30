import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import ResumenPage from "./pages/ResumenPage";
import { OrderFormPage } from "./pages/OrderFormPage";
import { LoginPage } from "./pages/LoginPage";
import { OrdersPage } from "./pages/OrdersPage";
import { OrderProvider } from "./context/ordersContext";

import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/add-order" element={<OrderFormPage />} />
                <Route path="/orders/:id" element={<OrderFormPage />} />
                <Route path="/profile" element={<h1>Profile</h1>} />
                <Route path="/resumen" element={<ResumenPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;
