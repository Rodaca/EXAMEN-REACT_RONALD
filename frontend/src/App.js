import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import Producto from './components/producto';
import Carrito from './components/carrito';

function App() {
  return (
    <ChakraProvider>
      <Router>
      <div className="App">
        
        <div>
          <Route exact path="/" component={Producto}></Route>
          <Route exact path="/carrito" component={Carrito}></Route>
        </div>
        
      </div>
    </Router>
    </ChakraProvider>
  );
}

export default App;
