import React from 'react';

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
      <img src='https://i.pinimg.com/564x/41/e8/28/41e828130a43aa54f0101eb92980ec58.jpg' style={{ maxWidth: '100%', maxHeight: '100%' }}/>
    </div>
  );
}

export default Imagem;
