import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./app/router/AppRouter";
import AppLayout from "./components/AppLayout/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
