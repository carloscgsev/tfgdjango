DROP TABLE IF EXISTS public.pelicula_lista;
DROP TABLE IF EXISTS public.actividad;
DROP TABLE IF EXISTS public.follow;
DROP TABLE IF EXISTS public.usuario_lista;
DROP TABLE IF EXISTS public.lista;
DROP TABLE IF EXISTS public.review;
DROP TABLE IF EXISTS public.credito;
DROP TABLE IF EXISTS public.pelicula_genero;
DROP TABLE IF EXISTS public.pelicula;
DROP TABLE IF EXISTS public.genero;
DROP TABLE IF EXISTS public.usuario;
DROP TABLE IF EXISTS public.equipo_tecnico;
DROP TABLE IF EXISTS public.actor;

DROP TYPE IF EXISTS public.sex;
DROP TYPE IF EXISTS public.tipo_priv;
DROP TYPE IF EXISTS public.tipo_rol;

CREATE TYPE SEX AS ENUM ('Mujer', 'Hombre', 'Desconocido');
CREATE TYPE TIPO_ROL AS ENUM ('Administrador', 'Usuario_Basico');
CREATE TYPE TIPO_PRIV AS ENUM ('Publica', 'Privada');

-- TABLA Actor
CREATE TABLE Actor (
    ID_Actor INT PRIMARY KEY UNIQUE,
    Sexo SEX NOT NULL,
    Puesto VARCHAR(255) NOT NULL,
    Nombre VARCHAR(255) NOT NULL,
    Nombre_Original VARCHAR(255) NOT NULL,
    Popularidad DECIMAL(5,2) NOT NULL,
    URL_Perfil VARCHAR(255),
    Personaje VARCHAR(255) NOT NULL
);

-- TABLA Equipo_Tecnico
CREATE TABLE Equipo_Tecnico (
    ID_EquipoTecnico INT PRIMARY KEY UNIQUE,
    Sexo SEX NOT NULL,
    Puesto VARCHAR(255) NOT NULL,
    Nombre VARCHAR(255) NOT NULL,
    Nombre_Original VARCHAR(255) NOT NULL,
    Popularidad DECIMAL(5,2) NOT NULL,
    URL_Perfil VARCHAR(255),
    Departamento VARCHAR(255) NOT NULL,
    Trabajo VARCHAR(255) NOT NULL
);


-- TABLA Usuario
CREATE TABLE Usuario (
    ID_Usuario INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    NombreUsuario VARCHAR(255) UNIQUE NOT NULL,
    Rol TIPO_ROL NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Contrasena VARCHAR(255) NOT NULL,
    FotoPerfil VARCHAR(255),
    Biografia TEXT,
    FechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FechaUltimaVisita TIMESTAMP
);

CREATE TABLE Genero (
    ID_Genero INT PRIMARY KEY UNIQUE,
    Nombre VARCHAR(255) NOT NULL
);

-- TABLA Película
CREATE TABLE Pelicula (
    ID_Pelicula INT PRIMARY KEY UNIQUE,
    Titulo VARCHAR(255) NOT NULL,
    FechaEstreno DATE NOT NULL,
    Duracion INT NOT NULL,
    Sinopsis TEXT NOT NULL,
    Puntuacion DECIMAL(3,2)
);

CREATE TABLE Pelicula_Genero (
    ID_Pelicula INT,
    ID_Genero INT,
    PRIMARY KEY (ID_Pelicula, ID_Genero),
    FOREIGN KEY (ID_Pelicula) REFERENCES Pelicula(ID_Pelicula),
    FOREIGN KEY (ID_Genero) REFERENCES Genero(ID_Genero)
);


CREATE TABLE Pelicula_Actor (
    ID_Pelicula INT,
    ID_Actor INT,
    PRIMARY KEY (ID_Pelicula, ID_Actor),
    FOREIGN KEY (ID_Pelicula) REFERENCES Pelicula(ID_Pelicula),
    FOREIGN KEY (ID_Actor) REFERENCES Actor(ID_Actor)
);

CREATE TABLE Pelicula_EquipoTecnico (
    ID_Pelicula INT,
    ID_EquipoTecnico INT,
    PRIMARY KEY (ID_Pelicula, ID_EquipoTecnico),
    FOREIGN KEY (ID_Pelicula) REFERENCES Pelicula(ID_Pelicula),
    FOREIGN KEY (ID_EquipoTecnico) REFERENCES Equipo_Tecnico(ID_EquipoTecnico)
);


-- TABLA Reseña
CREATE TABLE Review (
    ID_Review INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    ID_Usuario INT,
    ID_Pelicula INT,
    Calificacion DECIMAL(3,2),
    Texto TEXT,
    Fecha DATE,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario),
    FOREIGN KEY (ID_Pelicula) REFERENCES Pelicula(ID_Pelicula)
);

-- TABLA Lista
CREATE TABLE Lista (
    ID_Lista INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    ID_Autor INT,
    Titulo VARCHAR(255),
    Descripcion TEXT,
    Fecha DATE,
    Privacidad TIPO_PRIV,
    FOREIGN KEY (ID_Autor) REFERENCES Usuario(ID_Usuario)
);

-- TABLA Usuario_Lista (entidad asociativa para la relación N:N)
CREATE TABLE Usuario_Lista (
    ID_UsuarioLista INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    ID_Usuario INT,
    ID_Lista INT,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario),
    FOREIGN KEY (ID_Lista) REFERENCES Lista(ID_Lista)
);

-- TABLA Seguir
CREATE TABLE Follow (
    ID_Follow INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    ID_Seguidor INT,
    ID_Seguido INT,
    Fecha DATE,
    FOREIGN KEY (ID_Seguidor) REFERENCES Usuario(ID_Usuario),
    FOREIGN KEY (ID_Seguido) REFERENCES Usuario(ID_Usuario)
);

-- TABLA Actividad
CREATE TABLE Actividad (
    ID_Actividad INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    ID_Usuario INT,
    Tipo VARCHAR(255),
    Fecha DATE,
    Privacidad TIPO_PRIV,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

-- TABLA Pelicula_Lista (entidad asociativa para la relación N:N de Pelicula y Lista)
CREATE TABLE Pelicula_Lista (
    ID_PeliculaLista INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    ID_Pelicula INT,
    ID_Lista INT,
    FOREIGN KEY (ID_Pelicula) REFERENCES Pelicula(ID_Pelicula),
    FOREIGN KEY (ID_Lista) REFERENCES Lista(ID_Lista)
); 