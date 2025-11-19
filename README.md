# Sistema de Gestión Educativa - Angular + NgRx + JSON Server

Sistema completo de gestión educativa con autenticación, roles de usuario (Admin/Usuario), y gestión de alumnos, cursos e inscripciones usando NgRx para gestión de estado y JSON Server como backend simulado.

## 🚀 Características Principales

### Perfiles de Usuario

#### 👨‍💼 Perfil Administrador

- ✅ CRUD completo de alumnos
- ✅ CRUD completo de cursos
- ✅ CRUD completo de inscripciones
- ✅ Gestión de usuarios (crear, modificar, eliminar)
- ✅ Acceso total al sistema

#### 👤 Perfil Usuario

- ✅ Listar alumnos y cursos
- ✅ Agregar y eliminar inscripciones
- ❌ No puede gestionar usuarios
- ❌ Sin permisos de ABM en alumnos/cursos

### Tecnologías

- **Angular 20+** - Framework frontend
- **NgRx (Store, Effects, DevTools)** - Gestión de estado
- **Angular Material** - Componentes UI
- **JSON Server** - API REST simulada
- **RxJS** - Programación reactiva
- **TypeScript** - Lenguaje tipado

## 📦 Instalación y Ejecución

### Prerrequisitos

```bash
node -v  # v18 o superior
npm -v   # v9 o superior
```

### Pasos

1. **Clonar repositorio**

```bash
git clone <repository-url>
cd 2PF-Castiglione
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Iniciar proyecto** (JSON Server + Angular simultáneamente)

```bash
npm start
```

Esto ejecuta:

- **JSON Server** → `http://localhost:3000` (API)
- **Angular** → `http://localhost:4200` (Frontend)

### Scripts Alternativos

```bash
npm run client   # Solo Angular (puerto 4200)
npm run server   # Solo JSON Server (puerto 3000)
npm run build    # Build producción
npm test         # Ejecutar tests
```

## 🔐 Usuarios de Prueba

| Rol          | Email             | Password    | Permisos                     |
| ------------ | ----------------- | ----------- | ---------------------------- |
| **Admin**    | admin@test.com    | admin123    | Acceso completo              |
| **Usuario**  | user@test.com     | user123     | Solo lectura + inscripciones |
| **Profesor** | profesor@test.com | profesor123 | Solo lectura + inscripciones |

## 🏗️ Arquitectura

### Estructura de Carpetas

```
src/app/
├── core/
│   ├── guards/          # authGuard, adminGuard
│   ├── models/          # User, Student, Course, Enrollment
│   └── services/        # HTTP services
├── store/               # NgRx Store
│   ├── auth/           # Estado autenticación
│   ├── students/       # Estado alumnos
│   ├── courses/        # Estado cursos
│   ├── enrollments/    # Estado inscripciones
│   └── users/          # Estado usuarios (admin)
├── featured/
│   ├── auth/           # Login
│   └── dashboard/      # Módulo principal
│       ├── students/
│       ├── courses/
│       ├── enrollments/
│       └── users/
└── shared/             # Componentes compartidos
```

### NgRx State

```typescript
AppState {
  auth: { user, isAuthenticated, loading, error }
  students: { students[], loading, error }
  courses: { courses[], loading, error }
  enrollments: { enrollments[], loading, error }
  users: { users[], loading, error }
}
```

## 📊 API REST (JSON Server)

### Endpoints

```
GET/POST/PATCH/DELETE  /users          # Gestión usuarios
GET/POST/PATCH/DELETE  /students       # Gestión alumnos
GET/POST/PATCH/DELETE  /courses        # Gestión cursos
GET/POST/PATCH/DELETE  /enrollments    # Gestión inscripciones
```

### Proxy Config

Angular redirige `/api/*` → `http://localhost:3000` via `proxy.conf.json`

## 🔄 Flujo NgRx (Ejemplo: Cargar Alumnos)

1. **Component dispatch action**

```typescript
this.store.dispatch(StudentsActions.loadStudents());
```

2. **Effect llama al servicio**

```typescript
loadStudents$ = createEffect(() =>
  this.actions$.pipe(
    ofType(StudentsActions.loadStudents),
    exhaustMap(() =>
      this.studentsService
        .getAll()
        .pipe(map((students) => StudentsActions.loadStudentsSuccess({ students })))
    )
  )
);
```

3. **Reducer actualiza estado**

```typescript
on(StudentsActions.loadStudentsSuccess, (state, { students }) => ({
  ...state,
  students,
  loading: false,
}));
```

4. **Component lee con selector**

```typescript
students$ = this.store.select(selectAllStudents);
```

## 🛡️ Guards de Seguridad

- **authGuard** → Protege rutas que requieren login
- **adminGuard** → Protege rutas exclusivas para administradores

## 📝 Permisos por Rol

| Funcionalidad                | Admin | Usuario |
| ---------------------------- | :---: | :-----: |
| Ver alumnos                  |  ✅   |   ✅    |
| ABM alumnos                  |  ✅   |   ❌    |
| Ver cursos                   |  ✅   |   ✅    |
| ABM cursos                   |  ✅   |   ❌    |
| Ver inscripciones            |  ✅   |   ✅    |
| Crear/Eliminar inscripciones |  ✅   |   ✅    |
| Gestionar usuarios           |  ✅   |   ❌    |

## 🐛 Troubleshooting

**Puerto ocupado:**

```bash
lsof -ti:3000 | xargs kill -9  # Liberar puerto 3000
lsof -ti:4200 | xargs kill -9  # Liberar puerto 4200
```

**Errores de compilación:**

```bash
rm -rf node_modules package-lock.json
npm install
```

## 🚦 Próximas Mejoras

- [ ] Paginación en tablas
- [ ] Filtros y búsqueda avanzada
- [ ] Dashboard con gráficos
- [ ] Tests unitarios completos
- [ ] Modo oscuro

---

**Desarrollado por Renzo Castiglione** | Proyecto Final - Coderhouse Angular
