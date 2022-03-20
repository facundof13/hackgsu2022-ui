import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import useAuth, { AuthProvider } from "./hooks/useAuth";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import Footer from "components/Footer/Footer";

function App() {
  const auth = useAuth();
  return (
    <AuthProvider>
      <div className="App full-height font-mono">
        <ToastContainer />
        <Navbar />
        <AppRoutes />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
