## Getting Started

Levantar el server con:

```bash
npm run dev
```

1. En el navegador ir a [http://localhost:3000](http://localhost:3000).
2. Registrar un usuario (email, pass)[http://localhost:3000/create-account](http://localhost:3000/create-account).
3. Acceder al listado de archivos [http://localhost:3000/files](http://localhost:3000/files)
  3.a. Subir un archivo
  3.b. Desde el listado se puede compartir, descargar, eliminar.
4. Desloguear usuario
5. Reingresar con el usuario creado [http://localhost:3000/login](http://localhost:3000/login)

#### TODO List
- [ ] Definir un patron para validar emails
- [ ] Utilizar algún encriptador para las contraseñas (ej: md5)
- [ ] Sugerir los usuarios registrados para compartir los archivos (ahora se deben ingresar a mano los mails)
- [ ] Discriminar en distintos listados los archivos propios de los ajenos
- [ ] Darle cariño a la UI.

