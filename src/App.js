import './App.css';
import AppRoutes from './router/appRoutes.jsx';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" />
      <AppRoutes />
    </div>
  );
}

export default App;
