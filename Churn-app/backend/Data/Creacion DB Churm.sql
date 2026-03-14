CREATE DATABASE RestauranteChurn;

CREATE TABLE Cliente (
    IdClient INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(100),
    Telefono VARCHAR(20),
    Fecha_Registro DATE,
    Ultima_Visita DATE,
    Total_Visitas INT,
    Total_Gastos DECIMAL(10,2),
    Ultimo_Pedido DATE,
    Total_Pedidos INT
);

CREATE TABLE Usuario (
    IdUser INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Contrasena VARCHAR(255) NOT NULL,
    RolUser VARCHAR(50),
    Estado CHAR(1),
    Fecha_Registro DATE
);

CREATE TABLE Pedidos (
    IdPedido INT IDENTITY(1,1) PRIMARY KEY,
    Fecha DATE NOT NULL,
    Monto DECIMAL(10,2) NOT NULL,
    Metodo_pago VARCHAR(50),

    IdClient INT,
    IdUser INT,

    CONSTRAINT FK_Pedidos_Cliente FOREIGN KEY (IdClient) REFERENCES Cliente(IdClient),
    CONSTRAINT FK_Pedidos_Usuario FOREIGN KEY (IdUser) REFERENCES Usuario(IdUser)
);

CREATE TABLE Prediccion_Abandono (
    Id_Prediccion INT IDENTITY(1,1) PRIMARY KEY,
    Probabilidad_abandono DECIMAL(5,2),
    Nivel_riesgo VARCHAR(20),
    Fecha_Prediccion DATE,

    IdClient INT,

    CONSTRAINT FK_Prediccion_Cliente FOREIGN KEY (IdClient) REFERENCES Cliente(IdClient)
);