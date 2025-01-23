import './App.css';
import DrawerAppBar from './Components/DrawerAppBar';
import { Routes,Route } from "react-router-dom"
import Home from './Pages/Home';
import ListContact from './Pages/ListContact';
import Error from './Pages/Error';

function App() {
  return (
    <div className="App">
      <DrawerAppBar />

    <Routes>
    <Route path="/" element={<Home/>} />
        <Route path="/contact" element={<ListContact />} />
        <Route path="*" element={<Error/>} /> 
    </Routes>
    </div>
  );
}

export default App;
