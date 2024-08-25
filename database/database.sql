-- CREATE TABLE Establecimientos (
--     id_establecimiento INT PRIMARY KEY AUTO_INCREMENT,
--     nombre VARCHAR(100) NOT NULL,
--     ubicacion VARCHAR(255) NOT NULL,
--     area_total DECIMAL(10, 2) NOT NULL,
--     descripcion TEXT
-- );

-- CREATE TABLE Secciones (
--     id_seccion INT PRIMARY KEY AUTO_INCREMENT,
--     id_establecimiento INT NOT NULL,
--     nombre VARCHAR(100) NOT NULL,
--     descripcion TEXT,
--     FOREIGN KEY (id_establecimiento) REFERENCES Establecimientos(id_establecimiento)
-- );

-- CREATE TABLE Cuadros (
--     id_cuadro INT PRIMARY KEY AUTO_INCREMENT,
--     id_seccion INT NOT NULL,
--     nombre VARCHAR(100) NOT NULL,
--     area DECIMAL(10, 2) NOT NULL,
--     tipo_produccion ENUM('LANA', 'CARNE', 'REPRODUCTORES') NOT NULL,
--     descripcion TEXT,
--     FOREIGN KEY (id_seccion) REFERENCES Secciones(id_seccion)
-- );

-- CREATE TABLE CategoriasHacienda (
--     id_categoria INT PRIMARY KEY AUTO_INCREMENT,
--     nombre_categoria VARCHAR(50) NOT NULL
-- );

-- CREATE TABLE Hacienda (
--     id_hacienda INT PRIMARY KEY AUTO_INCREMENT,
--     id_categoria INT NOT NULL,
--     cantidad INT NOT NULL,
--     id_cuadro INT NOT NULL,
--     FOREIGN KEY (id_categoria) REFERENCES CategoriasHacienda(id_categoria),
--     FOREIGN KEY (id_cuadro) REFERENCES Cuadros(id_cuadro)
-- );


-- CREATE TABLE Produccion (
--     id_produccion INT PRIMARY KEY AUTO_INCREMENT,
--     id_cuadro INT NOT NULL,
--     tipo_produccion ENUM('LANA', 'CARNE', 'REPRODUCTORES') NOT NULL,
--     cantidad_producida DECIMAL(10, 2) NOT NULL,
--     fecha DATE NOT NULL,
--     FOREIGN KEY (id_cuadro) REFERENCES Cuadros(id_cuadro)
-- );

-- CREATE TABLE CostosProduccion (
--     id_costo INT PRIMARY KEY AUTO_INCREMENT,
--     id_produccion INT NOT NULL,
--     descripcion VARCHAR(255) NOT NULL,
--     monto DECIMAL(10, 2) NOT NULL,
--     fecha DATE NOT NULL,
--     FOREIGN KEY (id_produccion) REFERENCES Produccion(id_produccion)
-- );

-- CREATE TABLE Transacciones (
--     id_transaccion INT PRIMARY KEY AUTO_INCREMENT,
--     id_produccion INT NOT NULL,
--     tipo ENUM('INGRESO', 'EGRESO') NOT NULL,
--     descripcion VARCHAR(255) NOT NULL,
--     monto DECIMAL(10, 2) NOT NULL,
--     fecha DATE NOT NULL,
--     FOREIGN KEY (id_produccion) REFERENCES Produccion(id_produccion)
-- );

-- CREATE TABLE Mercados (
--     id_mercado INT PRIMARY KEY AUTO_INCREMENT,
--     nombre VARCHAR(100) NOT NULL,
--     pais VARCHAR(100) NOT NULL,
--     tipo_produccion ENUM('LANA', 'CARNE', 'REPRODUCTORES') NOT NULL,
--     precio DECIMAL(10, 2) NOT NULL
-- );

-- CREATE TABLE Personal (
--     id_personal INT PRIMARY KEY AUTO_INCREMENT,
--     id_establecimiento INT NOT NULL,
--     nombre VARCHAR(100) NOT NULL,
--     categoria VARCHAR(50) NOT NULL,
--     sueldo DECIMAL(10, 2) NOT NULL,
--     id_seccion INT NOT NULL,
--     FOREIGN KEY (id_establecimiento) REFERENCES Establecimientos(id_establecimiento),
--     FOREIGN KEY (id_seccion) REFERENCES Secciones(id_seccion)
-- );

-- CREATE TABLE CostosFijos (
--     id_costo_fijo INT PRIMARY KEY AUTO_INCREMENT,
--     id_establecimiento INT NOT NULL,
--     descripcion VARCHAR(255) NOT NULL,
--     monto DECIMAL(10, 2) NOT NULL,
--     fecha DATE NOT NULL,
--     FOREIGN KEY (id_establecimiento) REFERENCES Establecimientos(id_establecimiento)
-- );

-- CREATE TABLE Comercializacion (
--     id_comercializacion INT PRIMARY KEY AUTO_INCREMENT,
--     id_produccion INT NOT NULL,
--     id_mercado INT NOT NULL,
--     cantidad_comercializada DECIMAL(10, 2) NOT NULL,
--     fecha DATE NOT NULL,
--     FOREIGN KEY (id_produccion) REFERENCES Produccion(id_produccion),
--     FOREIGN KEY (id_mercado) REFERENCES Mercados(id_mercado)
-- );
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(255) NOT NULL,
  -- Otros campos necesarios
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE establecimiento (
  id_establecimiento INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  ubicacion VARCHAR(255),
  id_usuario INT,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE seccion (
  id_seccion INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  tipo VARCHAR(255),
  id_establecimiento INT,
  FOREIGN KEY (id_establecimiento) REFERENCES establecimiento(id_establecimiento)
);
CREATE TABLE cuadro (
  id_cuadro INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  id_seccion INT,
  FOREIGN KEY (id_seccion) REFERENCES seccion(id_seccion)
);
CREATE TABLE produccion (
  id_produccion INT AUTO_INCREMENT PRIMARY KEY,
  tipo ENUM('lana', 'carne', 'reproductores') NOT NULL,
  id_cuadro INT,
  FOREIGN KEY (id_cuadro) REFERENCES cuadro(id_cuadro)
);
CREATE TABLE ingreso (
  id_ingreso INT AUTO_INCREMENT PRIMARY KEY,
  monto DECIMAL(10, 2) NOT NULL,
  fecha DATE NOT NULL,
  id_produccion INT,
  FOREIGN KEY (id_produccion) REFERENCES produccion(id_produccion)
);
CREATE TABLE costo (
  id_costo INT AUTO_INCREMENT PRIMARY KEY,
  monto DECIMAL(10, 2) NOT NULL,
  tipo VARCHAR(255),
  fecha DATE NOT NULL,
  id_produccion INT,
  FOREIGN KEY (id_produccion) REFERENCES produccion(id_produccion)
);
CREATE TABLE transaccion (
  id_transaccion INT AUTO_INCREMENT PRIMARY KEY,
  monto DECIMAL(10, 2) NOT NULL,
  tipo VARCHAR(255),
  fecha DATE NOT NULL,
  id_produccion INT,
  FOREIGN KEY (id_produccion) REFERENCES produccion(id_produccion)
);
CREATE TABLE mercado (
  id_mercado INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  precio DECIMAL(10, 2) NOT NULL
);
CREATE TABLE personal (
  id_personal INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  categoria VARCHAR(255),
  sueldo DECIMAL(10, 2) NOT NULL,
  id_establecimiento INT,
  FOREIGN KEY (id_establecimiento) REFERENCES establecimiento(id_establecimiento)
);
CREATE TABLE costo_fijo (
  id_costo_fijo INT AUTO_INCREMENT PRIMARY KEY,
  descripcion VARCHAR(255) NOT NULL,
  monto DECIMAL(10, 2) NOT NULL,
  id_establecimiento INT,
  FOREIGN KEY (id_establecimiento) REFERENCES establecimiento(id_establecimiento)
);
CREATE TABLE categoria_hacienda (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT
  id_establecimiento INT,
  FOREIGN KEY (id_establecimiento) REFERENCES id_establecimiento(id_establecimiento)
);
CREATE TABLE hacienda (
  id_hacienda INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  id_categoria INT,
  FOREIGN KEY (id_categoria) REFERENCES categoria_hacienda(id_categoria),
  id_establecimiento INT,
  FOREIGN KEY (id_establecimiento) REFERENCES establecimiento(id_establecimiento)
);
