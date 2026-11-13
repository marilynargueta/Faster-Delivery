import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { MainLayout } from "./components/MainLayout";
import { CategoriesPage } from "./pages/CategoriesPage";
import { ProductCreatePage } from "./pages/ProductCreatePage";
import { ProfilePage } from "./pages/ProfilePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";


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

const LoginRoute = () => {
  const navigate = useNavigate();
  return <LoginPage onNavigateToRegister={() => navigate("/register")} />;
};

const RegisterRoute = () => {
  const navigate = useNavigate();
  return <RegisterPage onNavigateToLogin={() => navigate("/login")} />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/register" element={<RegisterRoute />} />
        </Route>

        {/* RUTAS PRIVADAS */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/catalog" replace />} />
            <Route path="/catalog" element={<DashboardPage />} />
            <Route path="/categories/create" element={<CategoriesPage />} />
            <Route path="/products/create" element={<ProductCreatePage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/profile" element={<ProfilePage onBackToDashboard={() => { window.location.href = "/catalog"; }} />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;