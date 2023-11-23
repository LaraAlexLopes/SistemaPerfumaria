import React from 'react';
import 'bootswatch/dist/minty/bootstrap.css';
import 'toastr/build/toastr.min';
import 'toastr/build/toastr.css';
import Navbar from './components/navbar.js';
import Rotas from './rotas.js';
import Login from './view/login.js';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <Navbar />
        <Rotas />
      </div>
    );
  }
}

export default App;