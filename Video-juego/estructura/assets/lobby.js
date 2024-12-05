import React from 'react';

const LobbyUsers = ({ users }) => {
  return (
    <div className="contenedor">
      <div className="tarjeta-1">
        <div className="canal">
          {users.map((user) => (
            <div key={user} className="row-2 forma color0" data-username={user}>
              <h1>{user}</h1>
            </div>
          ))}
          <div id="piano">
            <h4><img src="../img/sala.png" alt="cerebro" className="img-mediana" /></h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyUsers;