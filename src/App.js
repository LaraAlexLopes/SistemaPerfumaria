import React from 'react';
import 'bootswatch/dist/minty/bootstrap.css';
import 'toastr/build/toastr.min';
import 'toastr/build/toastr.css';
import Navbar from './components/navbar.js';
import Rotas from './rotas.js';
import Login from './view/login.js';

class App extends React.Component {
  
  render() {
    // Verifique se a rota atual é '/login'
    const isLoginRoute = window.location.pathname === '/login';
    const isNotLoginRoute = window.location.pathname !== '/login';
    const isIndex = window.location.pathname === '/index';

    return (
      <div className='container'>
        {isLoginRoute ?( <Rotas />) : (<>  <Navbar />  <Rotas /></>)}
        {isNotLoginRoute && <Navbar />}
        {isIndex && <Navbar />}
      </div>
    );
  }
}

export default App;
