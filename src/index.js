import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './view/authContext'; // Importar o AuthProvider
import Rotas from './rotas'; // Ou onde você está gerenciando suas rotas
import App from './App';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);