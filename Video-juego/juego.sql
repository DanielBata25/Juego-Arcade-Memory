
CREATE TABLE usuarios (
  id INT,
  nombre VARCHAR(50),
  correo VARCHAR(100),
  contraseña VARCHAR(255),
  PRIMARY KEY (id)
);

INSERT INTO usuarios (nombre, correo, contraseña) VALUES ('Juan Pérez', 'juan@example.com', 'Aadmin123');
INSERT INTO usuarios (nombre, correo, contraseña) VALUES ('Juan Gomez', '123@example.com', '55555');
