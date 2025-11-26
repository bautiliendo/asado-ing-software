# � Eventos Manager

Aplicación web para organizar y gestionar eventos de manera eficiente. Permite crear eventos, administrar invitados, controlar gastos y mantener todo organizado en un solo lugar.

## 📋 Descripción del Proyecto

**Eventos Manager** es una solución integral para la planificación de eventos sociales. La aplicación permite a los usuarios crear eventos, invitar personas, registrar gastos compartidos y llevar un control detallado de cada asado organizado.

### Modelo de Negocio

La aplicación está diseñada para facilitar la organización de eventos sociales donde múltiples personas participan y comparten gastos. Resuelve problemas comunes como:

- Olvidar quién confirmó asistencia
- Desorganización en la compra de ingredientes
- Dificultad para dividir gastos equitativamente
- Falta de registro histórico de eventos pasados

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React** 18.x - Biblioteca para construir interfaces de usuario
- **Vite** - Herramienta de desarrollo rápida
- **CSS3** - Estilos personalizados y responsivos
- **JavaScript ES6+** - Lógica del cliente

### Backend
- **Node.js** - Entorno de ejecución de JavaScript
- **Express** - Framework web para Node.js
- **TypeScript** - Superset tipado de JavaScript
- **Supabase** - Base de datos PostgreSQL y autenticación

### Base de Datos
- **PostgreSQL** (via Supabase) - Base de datos relacional

## 📁 Estructura del Proyecto

```
asado-ing-software/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuración de Supabase
│   │   ├── controllers/     # Controladores de rutas
│   │   ├── models/          # Modelos de datos
│   │   ├── routes/          # Definición de rutas API
│   │   └── index.ts         # Punto de entrada del servidor
│   ├── package.json
│   └── tsconfig.json
│
├── front-end/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   │   ├── EventCard/   # Tarjeta de evento
│   │   │   ├── EventForm/   # Formulario de evento
│   │   │   ├── Inicio/      # Página principal
│   │   │   └── Modal/       # Modal reutilizable
│   │   ├── services/        # Servicios de API
│   │   ├── App.jsx          # Componente principal
│   │   ├── main.jsx         # Punto de entrada
│   │   └── index.css        # Estilos globales
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🚀 Instalación y Configuración

### Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- Cuenta de Supabase (para la base de datos)

### Configuración del Backend

1. Navegar a la carpeta del backend:
```bash
cd backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo `.env` en la raíz de `backend/` con las siguientes variables:
```env
SUPABASE_URL=tu_url_de_supabase
SUPABASE_KEY=tu_key_de_supabase
PORT=3000
```

4. Iniciar el servidor:
```bash
npm run dev
```

El servidor estará corriendo en `http://localhost:3000`

### Configuración del Frontend

1. Navegar a la carpeta del frontend:
```bash
cd front-end
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar la aplicación:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📊 Modelo de Datos

### Entidades Principales

#### Events (Eventos)
- `id`: Identificador único
- `name`: Nombre del evento
- `date`: Fecha y hora del evento
- `location`: Ubicación del asado
- `description`: Descripción opcional

#### Guests (Invitados)
- `id`: Identificador único
- `name`: Nombre del invitado
- `alias`: Apodo opcional

#### Expenses (Gastos)
- `id`: Identificador único
- `event_id`: Referencia al evento
- `guest_id`: Quién realizó el gasto (opcional)
- `description`: Descripción del gasto
- `amount`: Monto del gasto

## 🔌 API Endpoints

### Eventos

- `GET /api/events` - Obtener todos los eventos
- `GET /api/events/:id` - Obtener un evento específico
- `POST /api/events` - Crear un nuevo evento
- `PUT /api/events/:id` - Actualizar un evento
- `DELETE /api/events/:id` - Eliminar un evento

### Invitados

- `GET /api/guests` - Obtener todos los invitados
- `GET /api/guests/:id` - Obtener un invitado específico
- `POST /api/guests` - Crear un nuevo invitado
- `PUT /api/guests/:id` - Actualizar un invitado
- `DELETE /api/guests/:id` - Eliminar un invitado

### Gastos

- `GET /api/expenses` - Obtener todos los gastos
- `GET /api/expenses/:id` - Obtener un gasto específico
- `POST /api/expenses` - Crear un nuevo gasto
- `PUT /api/expenses/:id` - Actualizar un gasto
- `DELETE /api/expenses/:id` - Eliminar un gasto

## ✨ Funcionalidades

### Implementadas

- ✅ Visualización de eventos en tarjetas
- ✅ Creación de nuevos eventos mediante formulario modal
- ✅ Validación de campos del formulario
- ✅ Diseño responsivo y moderno
- ✅ Integración con API REST
- ✅ Persistencia de datos en PostgreSQL

### Planificadas

- 🔄 Edición de eventos existentes
- 🔄 Eliminación de eventos
- 🔄 Gestión de invitados por evento
- 🔄 Registro y control de gastos
- 🔄 Cálculo automático de división de gastos
- 🔄 Vista detallada de eventos
- 🔄 Filtros y búsqueda de eventos

## 🎨 Características de Diseño

- **Interfaz moderna**: Diseño limpio y profesional
- **Responsivo**: Se adapta a diferentes tamaños de pantalla
- **Accesible**: Formularios con validación y feedback claro
- **Interactivo**: Animaciones y transiciones suaves
- **Consistente**: Paleta de colores y estilos unificados

## 👥 Equipo de Desarrollo

Proyecto desarrollado como Trabajo Práctico para la materia **Taller de Construcción de Software**.

## 📝 Metodología de Desarrollo

El proyecto se desarrolló utilizando metodología **Scrum**, con sprints de una semana y reuniones diarias de seguimiento. Se implementó un flujo de trabajo colaborativo con control de versiones mediante Git.

## 🐛 Solución de Problemas

### El backend no inicia
- Verificar que el archivo `.env` esté configurado correctamente
- Asegurar que las credenciales de Supabase sean válidas
- Revisar que el puerto 3000 no esté en uso

### El frontend no se conecta al backend
- Verificar que el backend esté corriendo en `http://localhost:3000`
- Revisar la configuración de CORS en el backend
- Comprobar la URL de la API en `eventService.js`

### Errores de base de datos
- Verificar la conexión a Supabase
- Asegurar que las tablas existan en la base de datos
- Revisar los permisos de las tablas en Supabase

## 📄 Licencia

Este proyecto es de uso académico para la materia Taller de Construcción de Software.

## 🙏 Agradecimientos

Agradecemos al profesor y a todos los compañeros que contribuyeron con feedback y sugerencias durante el desarrollo del proyecto.

---

**Desarrollado con ❤️ para organizar eventos increíbles 🎉**
