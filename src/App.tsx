import { useState } from "react";
import { useAuth } from "./context/useAuth";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import "./App.css";

type Screen = "login" | "register";

function App() {
  const { isAuthenticated, isHydrated } = useAuth();
  const [screen, setScreen] = useState<Screen>("login");

  if (!isHydrated) {
    return <div>Cargando...</div>;
  }

  if (isAuthenticated) {
    return <DashboardPage />;
  }

  if (screen === "register") {
    return <RegisterPage onNavigateToLogin={() => setScreen("login")} />;
  }

  return <LoginPage onNavigateToRegister={() => setScreen("register")} />;
}

export default App;