import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppLayout from "./AppLayout";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <Router>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </Router>
    </>
  );
}

export default App;
