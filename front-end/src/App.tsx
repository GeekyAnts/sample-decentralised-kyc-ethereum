import { ToastContainer } from "react-toastify";
import Routes from "./routes/routes";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  );
}
export default App;
