import React from 'react';

import ListagemPedidos from './view/listagem-pedidos';
import ListagemFornecedores from './view/listagem-fornecedores';
import ListagemProdutos from './view/listagem-produtos';
import ListagemClientes from './view/listagem-clientes';
import ListagemFuncionarios from './view/listagem-funcionarios';
import ListagemVendas from './view/listagem-vendas';
import ListagemClassificao from './view/listagem-classificacoes';
import ListagemCupons from './view/listagem-cupons';
import ListagemPerdas from './view/listagem-perdas.js';
import ListagemFragancias from './view/listagem-fragancias';
import ListagemTamanhos from './view/listagem-tamanhos';

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import CadastroFornecedores from './view/cadastro-fornecedores';
import CadastroPerda from './view/cadastro-perda';
import CadastroClassificação from './view/cadastro-classificacao';
import CadastroTamanho from './view/cadastro-tamanho';
import CadastroCupom from   './view/cadastro-cupom';
import CadastroFragancia from './view/cadastro-fragancia';
import CadastroProduto from './view/cadastro-produto';
import CadastroPedido from './view/cadastro-pedidos';
import CadastroClientes from './view/cadastro-clientes';
import CadastroFuncionarios from './view/cadastro-funcionarios';
import CadastroVendas from './view/cadastro-vendas';





function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/cadastro-fornecedores/:idParam?' element={<CadastroFornecedores />} />
        <Route path='/cadastro-perda/:idParam?' element={<CadastroPerda />} />
        <Route path='/cadastro-classificacao/:idParam?' element={<CadastroClassificação />} />
        <Route path='/cadastro-tamanho/:idParam?' element={<CadastroTamanho />} />
        <Route path='/cadastro-cupom/:idParam?' element={<CadastroCupom />} />
        <Route path='/cadastro-fragancia/:idParam?' element={<CadastroFragancia />} />
        <Route path='/cadastro-produto/:idParam?' element={<CadastroProduto/>} />
        <Route path='/cadastro-pedidos/:idParam?' element={<CadastroPedido/>} />
        <Route path='/cadastro-clientes/:idParam?' element={<CadastroClientes />} />
        <Route path='/cadastro-funcionarios/:idParam?' element={<CadastroFuncionarios />} />
        <Route path='/cadastro-vendas/:idParam?' element={<CadastroVendas />} />
        <Route path='/listagem-fornecedores' element={<ListagemFornecedores/>} />
        <Route path='/listagem-pedidos' element={<ListagemPedidos/>} />
        <Route path='/listagem-produtos' element={<ListagemProdutos/>} />
        <Route path='/listagem-cupons' element={<ListagemCupons/>} />
        <Route path='/listagem-perdas' element={<ListagemPerdas/>} />
        <Route path='/listagem-classificacoes' element={<ListagemClassificao/>} />
        <Route path='/listagem-tamanhos' element={<ListagemTamanhos/>} />
        <Route path='/listagem-fragancias' element={<ListagemFragancias/>} />
        <Route path='/listagem-clientes' element={<ListagemClientes/>} />
        <Route path='/listagem-funcionarios' element={<ListagemFuncionarios/>} />
        <Route path='/listagem-vendas' element={<ListagemVendas/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default Rotas;