# Inventory-Bookstore

Este proyecto esta creado con node y express en el cual se puede crear un libro, obtener libros, actualizar libros, borrar libros y cambiar el estado de un libro.

## Requisitos y pasos para la instalaccion

1. En primer lugar para antes de descargar el proyecto tenemos que tener instalado node para poder ejecutar el proyecto e instalar los paquetes necesarios, puedes descargarlo desde este link [Node](https://nodejs.org/en)

2)Despues tienes que descargar [MongoDB](https://www.mongodb.com/try/download/community-kubernetes-operator) para la gestion de la base de datos esto incluye una herramienta llamada MongoDBCompass en cual es una herramienta interactiva gratuita para consultar, optimizar y analizar sus datos en MongoDB.

3)Luego tienes que descargar el proyecto desde la pagina puedes descargarlo directamente como un archivo zip [github](https://github.com/juanesxz/inventory-bookstore.git) o tambien puedes clonarlo si tienes descargado Git, si no descargalo desde aca [Git](https://git-scm.com), ya despues de eso puedes clonarlo con el siguiente comando

```bash
git clone https://github.com/juanesxz/inventory-bookstore.git
```

4)Una vez que hayas clonado o descargado el repositorio, sigue estos pasos:

- Abrir la terminal: Navega hasta la carpeta del proyecto con el siguiente comando:

```bash
cd inventory-bookstore
```

- Instalar las dependencias: Ejecuta este comando para instalar las dependencias necesarias para correr el servidor:

```bash
npm i
```

- Puedes abrir la terminal desde la misma carpeta del proyecto o usar la terminal de Git para ejecutar los comandos.

si el comando de npm i no funciona, intentalo nuevamente o prueba usando npm install por si tienes versiones viejas de node.

#### Una ves hecho todos los pasos de instalacion puedes ejecutar el proyecto en los pasos siguientes de ejecucion

## Ejecucion del servidor

### Si quieres ejecutar el proyecto en modo de desarrollo puedes usar el siguiente comando

```bash
npm run dev
```

### Si quieres ejecutar el proyecto en modo de producción puedes usar el siguiente comando

```bash
npm run start
```

### No olvides ejecutar el comando `npm run dev` para ejecutar el proyecto en modo de desarrollo o `npm run start` para ejecutar el proyecto en modo de producción

## Fronted del proyecto

El fronted del proyecto se encuentra en la carpeta `src/public` y esta puesta en la ruta `/` osea la ruta principal de forma estatica con express.

## Explicación de la estructura del proyecto y decisiones de diseño.

Este proyecto fue creado con una extructura tipicas de carpetas tipica como todo ya conocemos en el lenguaje de programacion

### Backend

- `src`: carpeta principal donde se encuentra el proyecto
- `src/config`: carpeta donde se encuentra la configuracion del proyecto
- `src/routes`: carpeta donde se encuentra las rutas del proyecto
- `src/controllers`: carpeta donde se encuentra los controladores del proyecto
- `src/models`: carpeta donde se encuentra los modelos del proyecto
- `src/public`: carpeta donde se encuentra los archivos estaticos del proyecto

Esta estructura es la que se uso para la creacion de este proyecto backend y es una forma muy sencilla de separar los archivos del proyecto ya que separamos toda la logica por carpetas haciendo que el proyecto sea mas legible y entendible.

### Fronted

- `src/public`: carpeta donde se encuentra los archivos estaticos del proyecto
- `src/public/pages`: carpeta donde se encuentra las paginas del proyecto
- `src/public/js`: carpeta donde se encuentra los archivos JS del proyecto
- `src/public/css`: carpeta donde se encuentra los archivos CSS del proyecto
- `src/public/vendor` carpeta donde se encuentra los archivos JS, CSS del proyecto o importaciones de librerias que se utilizan
- `src/public/services`: carpeta donde se encuentra los servicios del proyecto

### Diseño

El diseño del proyecto en el fronted fue diseñada de forma simple pero llamativa para el usuario, de forma el proyecto se enfoque en la facilidad de uso.
