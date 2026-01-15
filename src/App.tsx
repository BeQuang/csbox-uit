import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./app/router/AppRouter";
import LayoutSwitch from "./app/layouts/LayoutSwitch";

function App() {
  return (
    <BrowserRouter>
      <LayoutSwitch>
        <AppRouter />
      </LayoutSwitch>
    </BrowserRouter>
  );
}

export default App;
