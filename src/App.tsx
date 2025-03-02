import './App.css'

import Navigation from './routes/Navigation'
import { ContextProvider } from './Context/ContextProvider'
import { ToastContainer } from "react-toastify";
function App() {
  
  return (
    <ContextProvider>
      <ToastContainer />
     <Navigation />
     </ContextProvider>
  );
}

export default App
