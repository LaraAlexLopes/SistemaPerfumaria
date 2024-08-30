import React from 'react';
import { createRoot } from 'react-dom/client'; // Importe createRoot
import { AuthProvider } from './view/authContext'; // Importar o AuthProvider
import App from './App';

// Crie uma raiz
const root = createRoot(document.getElementById('root'));

// Renderize o aplicativo usando createRoot
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
