import React from 'react';
//import minhaImagem from '//imagem.jpg';

function Imagem() {
      const imagemStyle = {
            display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
       width: '80vw',
        height: '80vh',
          };
  return (
    <div style={imagemStyle} >
      <img src='http://www.luvparfum.com/blog/menu/R&G-Jade.jpg' style={{ maxWidth: '100%', maxHeight: '100%' }}/>
      {/* Outros componentes e conteúdo da página de listagem */}
    </div>
  );
}

export default Imagem;
