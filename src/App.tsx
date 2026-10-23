import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/useAuth";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { MainLayout } from "./components/MainLayout";
import { CategoriesPage } from "./pages/CategoriesPage";
import { ProductCreatePage } from "./pages/ProductCreatePage";

//GUARDAR LA RUTA PRIVADA
const ProtectedRoute = () => {
  const { isAuthenticated, isHydrated } = useAuth();
  if (!isHydrated) return null;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

//GUARDAR RUTA PUBLICA
const PublicRoute = () => {
  const { isAuthenticated, isHydrated } = useAuth();
  if (!isHydrated) return null;

  return isAuthenticated ? <Navigate to="/catalog" replace /> : <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage onNavigateToRegister={() => {}} />} />
          <Route path="/register" element={<RegisterPage onNavigateToLogin={() => {}} />} />
        </Route>

        {/* RUTAS PRIVADAS */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/catalog" replace />} />
            <Route path="/catalog" element={<DashboardPage />} />
            <Route path="/categories/create" element={<CategoriesPage />} />
            <Route path="/products/create" element={<ProductCreatePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;