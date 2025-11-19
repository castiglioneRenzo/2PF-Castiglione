# 🚀 INICIO RÁPIDO

## Ejecutar el Proyecto

```bash
npm start
```

Espera a que ambos servicios inicien:

- ✅ JSON Server en http://localhost:3000
- ✅ Angular en http://localhost:4200

## Login

Abre tu navegador en http://localhost:4200

Usa estas credenciales:

### 👨‍💼 Administrador (Acceso Completo)

```
Email: admin@test.com
Password: admin123
```

### 👤 Usuario Normal (Acceso Limitado)

```
Email: user@test.com
Password: user123
```

## Navegación

Después del login, verás el menú lateral con:

- 🏠 **Inicio** - Dashboard principal
- 🎓 **Alumnos** - Gestión de estudiantes
- 📚 **Cursos** - Gestión de cursos
- 📝 **Inscripciones** - Asignación de alumnos a cursos
- 👥 **Usuarios** - Gestión de usuarios (solo visible para admin)

## Probar Funcionalidades

### Como Administrador

1. Ir a **Alumnos** - Ver, crear, editar, eliminar
2. Ir a **Cursos** - Ver, crear, editar, eliminar
3. Ir a **Inscripciones** - Asignar alumnos a cursos
4. Ir a **Usuarios** - Gestionar usuarios del sistema

### Como Usuario Normal

1. Ir a **Alumnos** - Solo ver (sin botones de ABM)
2. Ir a **Cursos** - Solo ver (sin botones de ABM)
3. Ir a **Inscripciones** - Ver y gestionar
4. **Usuarios** - Opción no disponible en el menú

## Cerrar Sesión

Click en el botón rojo "Cerrar Sesión" al final del menú lateral.

## Ver Estado Global (NgRx DevTools)

1. Instala [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools) en Chrome
2. Abre las DevTools del navegador (F12)
3. Pestaña "Redux"
4. Observa el estado global en tiempo real

## Detener el Proyecto

Presiona `Ctrl + C` en la terminal y confirma con `Y`.

## Troubleshooting

### Puerto ocupado

```bash
lsof -ti:3000 | xargs kill -9
lsof -ti:4200 | xargs kill -9
npm start
```

### Errores de compilación

```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

### Base de datos corrupta

Edita `db.json` manualmente o restaura desde git.

---

**¡Listo!** El sistema está funcionando con autenticación, permisos por rol y gestión completa de alumnos, cursos e inscripciones usando NgRx.
