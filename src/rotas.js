import React from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

import Login from './view/login';
import { isAuthenticated } from './view/auth'; 

import ListagemPedidos from './view/listagem-pedidos';
import ListagemFornecedores from './view/listagem-fornecedores';
import ListagemProdutos from './view/listagem-produtos';
import ListagemClientes from './view/listagem-clientes';
import ListagemFuncionarios from './view/listagem-funcionarios';
import ListagemVendas from './view/listagem-vendas';
import ListagemClassificao from './view/listagem-classificacoes';
import ListagemCupons from './view/listagem-cupons';
import ListagemPerdas from './view/listagem-perdas';
import ListagemFragancias from './view/listagem-fragancias';
import ListagemTamanhos from './view/listagem-tamanhos';
import ListagemEstoque from './view/listagem-estoque';
import ListagemMelhoresFuncionarios from './view/listagem-melhoresFuncionarios';
import ListagemProdutosMaisVendido from './view/listagem-produtos-mais-vendidos';
import ListagemMelhoresClientes from './view/listagem-melhoresClientes';
import ListagemCadastro from './view/listagem-cadastro';
import ListagemTipoPerda from './view/listagem-tipo-perda';
import ListagemUsuarios from './view/listagem-usuario';

import CadastroFornecedores from './view/cadastro-fornecedores';
import CadastroPerda from './view/cadastro-perda';
import CadastroClassificação from './view/cadastro-classificacao';
import CadastroTamanho from './view/cadastro-tamanho';
import CadastroCupom from './view/cadastro-cupom';
import CadastroFragancia from './view/cadastro-fragancia';
import CadastroProduto from './view/cadastro-produto';
import CadastroPedido from './view/cadastro-pedidos';
import CadastroClientes from './view/cadastro-clientes';
import CadastroFuncionarios from './view/cadastro-funcionarios';
import CadastroVendas from './view/cadastro-vendas';
import CadastroEstoque from './view/cadastro-estoque';
import CadastroFuncionariosMelhor from './view/cadastro-funcionario-melhor';
import CadastroTipoPerda from './view/cadastro-tipo-perda';
import CadastroUsuario from './view/cadastro-usuário';

import Imagem from './view';

function PrivateRoute({ element }) {
  return isAuthenticated() ? element : <Navigate to="/login" />;
}

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota de login sem proteção */}
        <Route path="/login" element={<Login />} />
        
        {/* Redireciona a rota principal para o login se não estiver autenticado */}
        <Route path="/" element={<Navigate to={isAuthenticated() ? "/login" : "/index"} />} />
        
        {/* Rotas protegidas */}
        <Route path="/index" element={<PrivateRoute element={<Imagem />} />} />
        <Route path="/cadastro-fornecedores/:idParam?" element={<PrivateRoute element={<CadastroFornecedores />} />} />
        <Route path="/cadastro-perda/:idParam?" element={<PrivateRoute element={<CadastroPerda />} />} />
        <Route path="/cadastro-classificacao/:idParam?" element={<PrivateRoute element={<CadastroClassificação />} />} />
        <Route path="/cadastro-tamanho/:idParam?" element={<PrivateRoute element={<CadastroTamanho />} />} />
        <Route path="/cadastro-cupom/:idParam?" element={<PrivateRoute element={<CadastroCupom />} />} />
        <Route path="/cadastro-fragancia/:idParam?" element={<PrivateRoute element={<CadastroFragancia />} />} />
        <Route path="/cadastro-produto/:idParam?" element={<PrivateRoute element={<CadastroProduto />} />} />
        <Route path="/cadastro-pedidos/:idParam?" element={<PrivateRoute element={<CadastroPedido />} />} />
        <Route path="/cadastro-clientes/:idParam?" element={<PrivateRoute element={<CadastroClientes />} />} />
        <Route path="/cadastro-funcionarios/:idParam?" element={<PrivateRoute element={<CadastroFuncionarios />} />} />
        <Route path="/cadastro-vendas/:idParam?" element={<PrivateRoute element={<CadastroVendas />} />} />
        <Route path="/cadastro-estoque/:idParam?" element={<PrivateRoute element={<CadastroEstoque />} />} />
        <Route path="/cadastro-funcionario-melhor/:idParam?" element={<PrivateRoute element={<CadastroFuncionariosMelhor />} />} />
        <Route path="/cadastro-tipo-perda/:idParam?" element={<PrivateRoute element={<CadastroTipoPerda />} />} />
        <Route path="/cadastro-usuario/:idParam?" element={<PrivateRoute element={<CadastroUsuario />} />} />
        
        {/* Rotas de listagem protegidas */}
        <Route path="/listagem-fornecedores" element={<PrivateRoute element={<ListagemFornecedores />} />} />
        <Route path="/listagem-pedidos" element={<PrivateRoute element={<ListagemPedidos />} />} />
        <Route path="/listagem-produtos" element={<PrivateRoute element={<ListagemProdutos />} />} />
        <Route path="/listagem-cupons" element={<PrivateRoute element={<ListagemCupons />} />} />
        <Route path="/listagem-perdas" element={<PrivateRoute element={<ListagemPerdas />} />} />
        <Route path="/listagem-classificacoes" element={<PrivateRoute element={<ListagemClassificao />} />} />
        <Route path="/listagem-tamanhos" element={<PrivateRoute element={<ListagemTamanhos />} />} />
        <Route path="/listagem-fragancias" element={<PrivateRoute element={<ListagemFragancias />} />} />
        <Route path="/listagem-clientes" element={<PrivateRoute element={<ListagemClientes />} />} />
        <Route path="/listagem-funcionarios" element={<PrivateRoute element={<ListagemFuncionarios />} />} />
        <Route path="/listagem-vendas" element={<PrivateRoute element={<ListagemVendas />} />} />
        <Route path="/listagem-estoque" element={<PrivateRoute element={<ListagemEstoque />} />} />
        <Route path="/listagem-melhoresFuncionarios" element={<PrivateRoute element={<ListagemMelhoresFuncionarios />} />} />
        <Route path="/listagem-produtos-mais-vendidos" element={<PrivateRoute element={<ListagemProdutosMaisVendido />} />} />
        <Route path="/listagem-melhoresClientes" element={<PrivateRoute element={<ListagemMelhoresClientes />} />} />
        <Route path="/listagem-cadastro" element={<PrivateRoute element={<ListagemCadastro />} />} />
        <Route path="/listagem-usuario" element={<PrivateRoute element={<ListagemUsuarios />} />} />
        <Route path="/listagem-tipo-perda" element={<PrivateRoute element={<ListagemTipoPerda />} />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
