###############################
#                             #
# Ejecutar en Python ≥3.10.12 #
#                             #
# pip install requests        #
# pip install psycopg[binary] #
#                             #
###############################

import requests
import psycopg


headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NmMwNmY5ZDlmN2E2YmUwZmVmYzc4Mjk1MTc1ZjgzZiIsInN1YiI6IjY1Zjg2OTZiZDhmNDRlMDE3YzUyOGVhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.__BsLiHFpLbJRSQjGwRz28Y_wOo9IU-viRF26tlj5ac"
}

def getPeliculas():
    url_peliculas = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-ES&page=1&primary_release_date.gte=1910-01-01&primary_release_date.lte=1930-01-31&sort_by=popularity.desc"

    response = requests.get(url_peliculas, headers=headers)

    # Se convierte a JSON lo que devuelve el request
    response_json = response.json() 

    # Se sabe que 'results' es una lista 
    results = response_json.get('results', [])

    return results

# Funcion para obtener los detalles de una pelicula segun su ID
def getPeliculaDetalles(id_pelicula):
    url_detalles = f"https://api.themoviedb.org/3/movie/{id_pelicula}?language=es-ES"
    response_detalles = requests.get(url_detalles, headers=headers)
    
    # Se comprueba si ha habido exito
    if response_detalles.status_code == 200:
        # Se pasa a JSON el resultado
        response_detalles_json = response_detalles.json()
        
        # Se devuelve
        return response_detalles_json
    else:
        # Si no ha habido exito se muestra un mensaje de error y se devuelve None
        print(f"Error al intentar obtener los detalles para la pelicula con ID: {id_pelicula}. Status code: {response_detalles.status_code}")
        return None

# Funcion para obtener los creditos, actores y equipo tecnico, de una pelicula segun su ID
def getPeliculaCreditos(id_pelicula):
    url_creditos = f"https://api.themoviedb.org/3/movie/{id_pelicula}/credits?language=es-ES"
    response_creditos = requests.get(url_creditos, headers=headers)

    # Se comprueba si ha habido exito
    if response_creditos.status_code == 200:
        # Se pasa a JSON el resultado
        response_creditos_json = response_creditos.json()
        
        # Se devuelve
        return response_creditos_json
    else:
        # Si no ha habido exito se muestra un mensaje de error y se devuelve None
        print(f"Error al intentar obtener los creditos para la pelicula con ID: {id_pelicula}. Status code: {response_creditos.status_code}")
        return None

# Funcion para insertar en la base de datos
def insert_Detalles(results):

    # Conexion con la base de datos
    conn = psycopg.connect(
        dbname="Cine",
        user="carlos",
        password="admin",
        host="localhost",
        port="5432"
    )

    # Un cursor para realizar operaciones dentro de la base de datos
    cursor = conn.cursor()

    try:
        # Comienza la operacion
        conn.autocommit = False

        for pelicula in results:
            # Se obtiene la ID de una pelicula y posteriormente sus detalles
            id_pelicula = pelicula.get('id')
            detalles = getPeliculaDetalles(id_pelicula)

            # Detalles
            titulo = detalles.get('original_title')
            fecha_estreno = detalles.get('release_date')
            duracion = detalles.get('runtime')
            sinopsis = detalles.get('overview')
            puntuacion = detalles.get('vote_average')

            # Insertar la pelicula
            sql = "INSERT INTO Pelicula (id_pelicula, titulo, fechaestreno, duracion, sinopsis, puntuacion) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id_pelicula"
            cursor.execute(sql, (id_pelicula, titulo, fecha_estreno, duracion, sinopsis, puntuacion))

            # Bloque para meter en la tabla Genero todos los generos de forma unica de las peliculas conseguidas
            # Y tambien para añadir la relacion pelicula_genero
            generos = detalles.get('genres')
            for x in generos:
                id_genero = x["id"]
                genero_nombre = x["name"]

                # Insertar el genero (si no existe)
                sql2 = 'INSERT INTO Genero (id_genero, nombre) VALUES (%s, %s) ON CONFLICT (id_genero) DO NOTHING;'
                cursor.execute(sql2, (id_genero, genero_nombre))

                # Insertar la relacion pelicula-genero
                sql3 = 'INSERT INTO Pelicula_Genero (id_pelicula, id_genero) VALUES (%s, %s);'
                cursor.execute(sql3, (id_pelicula, id_genero))

            # Bloque para meter en la tabla Actor y Equipo_Tecnico todas las entradas 
            # Y tambien para añadir a las relaciones Pelicula_X
            mapeado_sexo = {
                '0': 'Desconocido',
                '1': 'Mujer',
                '2': 'Hombre'
            }

            creditos = getPeliculaCreditos(id_pelicula)
            for actor in creditos['cast']:
                id_actor = actor.get('id')
                sexo_api = actor.get('gender')
                sexo = mapeado_sexo.get(str(sexo_api))
                puesto = actor.get('known_for_department')
                nombre = actor.get('name')
                nombre_original = actor.get('original_name')
                popularidad = actor.get('popularity')
                url_perfil = actor.get('profile_path')
                personaje = actor.get('character')

                sql4 = 'INSERT INTO Actor (ID_Actor, Sexo, Puesto, Nombre, Nombre_Original, Popularidad, URL_Perfil, Personaje) VALUES (%s, %s::SEX, %s, %s, %s, %s, %s, %s) ON CONFLICT (ID_Actor) DO NOTHING;'
                cursor.execute(sql4, (id_actor, sexo, puesto, nombre, nombre_original, popularidad, url_perfil, personaje))
        
                sql41 = 'INSERT INTO Pelicula_Actor (ID_Pelicula, ID_Actor) VALUES (%s, %s) ON CONFLICT (ID_Pelicula, ID_Actor) DO NOTHING;'
                cursor.execute(sql41, (id_pelicula, id_actor))

            for equipo in creditos['crew']:
                id_equipo = equipo.get('id')
                sexo_api = equipo.get('gender')
                sexo = mapeado_sexo.get(str(sexo_api))
                puesto = equipo.get('known_for_department')
                nombre = equipo.get('name')
                nombre_original = equipo.get('original_name')
                popularidad = equipo.get('popularity')
                url_perfil = equipo.get('profile_path')
                departamento = equipo.get('department')
                trabajo = equipo.get('job')

                sql5 = 'INSERT INTO Equipo_Tecnico (ID_EquipoTecnico, Sexo, Puesto, Nombre, Nombre_Original, Popularidad, URL_Perfil, Departamento, Trabajo) VALUES (%s, %s::SEX, %s, %s, %s, %s, %s, %s, %s) ON CONFLICT (ID_EquipoTecnico) DO NOTHING;'
                cursor.execute(sql5, (id_equipo, sexo, puesto, nombre, nombre_original, popularidad, url_perfil, departamento, trabajo))

                sql51 = 'INSERT INTO Pelicula_EquipoTecnico (ID_Pelicula, ID_EquipoTecnico) VALUES (%s, %s) ON CONFLICT (ID_Pelicula, ID_EquipoTecnico) DO NOTHING;'
                cursor.execute(sql51, (id_pelicula, id_equipo))

                
        # Se confirma todo
        conn.commit()

    except Exception as e:
        # Se hace rollback si ocurriere algun error
        conn.rollback()
        print("An error occurred:", e)
    finally:
        # Finalmente se cierra el cursor y la conexion
        cursor.close()
        conn.close()


# Funcion principal
def main():
    results = getPeliculas()
    insert_Detalles(results)

if __name__ == "__main__":
    main()