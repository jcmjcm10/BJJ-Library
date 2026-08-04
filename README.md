# BJJ Library

Catálogo web de técnicas de Brazilian Jiu-Jitsu: indexa vídeos de YouTube con tags, permite buscarlos y organizarlos en listas ordenadas de estudio.

![Captura](docs/screenshot.png)

## Características

- **Catálogo de vídeos** con miniatura de YouTube y reproducción embebida en diálogo.
- **Buscador por tags** con autocompletado: sugiere tags según la última palabra escrita y filtra en modo AND (todos los tags introducidos deben coincidir). Si la palabra corresponde a un tag existente, la coincidencia es exacta; si no, es parcial.
- **Scroll infinito**: carga bloques de 10 vídeos al llegar al final de la página.
- **Listas de técnicas** (playlists): crear, eliminar, añadir/quitar vídeos y reordenarlos con controles arriba/abajo.
- **Filtrado del catálogo por listas**: marcando listas con checkbox, el catálogo muestra solo sus vídeos.
- **Alta, edición y borrado de vídeos**, con extracción automática del ID de YouTube desde la URL pegada (acepta formatos `/embed/…` y `youtu.be/…`, y convierte el segundo a URL embebible).
- **Visibilidad pública/privada** por vídeo. El selector de visibilidad pública solo se muestra a usuarios con `is_staff`.
- **Autenticación por token**: login, registro y logout. La sesión se persiste en `localStorage` y se restaura al arrancar el store.
- **Feedback de operaciones** con notificaciones (plugin `Notify` de Quasar).
- **Script de despliegue** por `rsync`/`ssh` a un servidor que sirve los estáticos.

El backend **no forma parte de este repositorio**: la aplicación es una SPA que consume una API REST externa.

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework UI | Vue 3 (Composition API, `setup()`) |
| Componentes | Quasar 2 (`@quasar/app-vite` 2.x) |
| Build | Vite (vía Quasar CLI) |
| Estado | Pinia 3 (stores con setup syntax) |
| Rutas | Vue Router 5, modo `hash` |
| HTTP | axios 1.6 |
| Estilos | SCSS + variables de Quasar |
| Calidad | ESLint 8 (`eslint-plugin-vue`) + Prettier 2 |
| Despliegue | Bash + `rsync` + `ssh` (`scripts/publish_piecito.sh`) |
| Empaquetado alternativo | Modos SSR / PWA / Cordova / Electron / BEX preconfigurados en `quasar.config.js` (no usados actualmente) |

## Puesta en marcha

Requisitos: Node.js 18 (el `package.json` declara `^18 || ^16 || ^14.19`) y npm ≥ 6.13.4.

```bash
# 1. Clonar
git clone https://github.com/jcmjcm10/BJJ-Library.git
cd BJJ-Library

# 2. Instalar dependencias
npm install

# 3. Arrancar en desarrollo (hot reload, abre el navegador automáticamente)
npm run dev
```

Otros comandos:

```bash
npm run build     # build de producción en dist/spa
npm run lint      # ESLint sobre .js y .vue
npm run format    # Prettier
```

El build genera un SPA con `publicPath: '/bjj-library/'` y router en modo `hash`, pensado para colgar de un subdirectorio de un servidor de estáticos sin configurar rewrites.

### Despliegue

`scripts/publish_piecito.sh` (y su equivalente para Windows) hace el ciclo completo: build, borrado de los `.map`, backup del `index.html` remoto, `rsync` de `dist/spa/` al servidor y corrección de permisos a `www-data`. El host de destino está fijado dentro del propio script.

```bash
./scripts/publish_piecito.sh
```

## Variables de entorno

El proyecto **no usa variables de entorno**. La URL base de la API está fijada como constante en [`src/API/bjj-library.js`](src/API/bjj-library.js):

```js
const API_ROOT = 'https://myfatanimals.com/apps/bjj-library/'
```

Para apuntar a otro backend (por ejemplo, uno local) hay que editar esa constante y reconstruir. En el fichero quedan comentadas las URLs alternativas usadas durante el desarrollo.

## Endpoints de la API

Todas las rutas son relativas a `API_ROOT`. «Auth» indica si la petición envía la cabecera `Authorization: Token <token>`.

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| `POST` | `login/` | No | Autentica. En un `201` devuelve `{ token, user: { username, email, is_staff } }` y el frontend guarda la sesión. |
| `GET` | `logout/?token=<token>` | No (token por query) | Cierra sesión en el servidor. |
| `POST` | `user/` | No | Registro de usuario (`username`, `password`, `email`). |
| `GET` | `video/` | Sí | Lista de vídeos. Se lee de `response.data.results` (respuesta paginada). |
| `POST` | `video/` | Sí | Crea un vídeo. Tras la respuesta se crean sus relaciones en `videoTag/`. |
| `PUT` | `video/<id>/` | Sí | Actualiza un vídeo y reenvía sus tags a `videoTag/` con `edit: true`. |
| `DELETE` | `video/<id>/` | Sí | Elimina un vídeo. |
| `POST` | `videoTag/` | Sí | Asocia un tag a un vídeo (`videoId`, `tagId`). |
| `GET` | `Tag/` | Sí | Lista de tags disponibles (`response.data.results`). |
| `GET` | `VideoList/` | Sí | Listas de técnicas con sus vídeos (`response.data.results`). |
| `POST` | `VideoList/` | Sí | Crea una lista (`title`). Devuelve `201`. |
| `PUT` | `VideoList/<id>/` | Sí | Operación sobre la lista según el campo `op`: `insert`, `remove`, `up`, `down`. |
| `DELETE` | `VideoList/<id>/` | Sí | Elimina una lista. |

## Modelos de datos

El repositorio no contiene el esquema de base de datos. Estas son las estructuras tal y como las consume y las envía el frontend.

### Video

| Campo | Tipo | Notas |
|---|---|---|
| `id` | int | Clave primaria. |
| `title` | string | Título mostrado en la tarjeta y el reproductor. |
| `url` | string | URL embebible de YouTube (`https://www.youtube.com/embed/<id>`). |
| `youtubeID` | string | ID del vídeo; se usa para construir la miniatura `https://img.youtube.com/vi/<youtubeID>/sddefault.jpg`. |
| `tags` | string[] | **Al leer**: array de nombres de tag. **Al escribir**: array de `{ label, value }`, donde `value` es el `id` del tag. |
| `visibility` | `'private'` \| `'public'` | Solo los usuarios `is_staff` pueden asignar `public`. |
| `list` | int \| null | Lista opcional a la que se añade el vídeo al crearlo. |

### Tag

| Campo | Tipo | Notas |
|---|---|---|
| `id` | int | Clave primaria. |
| `name` | string | Se usa en el buscador y en los chips del formulario. |

### VideoList

| Campo | Tipo | Notas |
|---|---|---|
| `id` | int | Clave primaria. |
| `title` | string | Nombre de la lista. |
| `owner` | int \| null | Propietario. Si es `null`, la UI oculta el menú de editar/eliminar y la lista no aparece como destino en «Añadir a lista». |
| `videos` | Video[] | Vídeos de la lista, en orden. El orden se modifica con `op: 'up'` / `'down'`. |

### Authentication (estado de sesión, solo en cliente)

Se guarda serializado en `localStorage` bajo la clave `authentication`.

| Campo | Tipo | Notas |
|---|---|---|
| `username` | string | |
| `email` | string | |
| `accesToken` | string | Token enviado en la cabecera `Authorization`. |
| `isAuthenticate` | bool | |
| `isStaff` | bool | Habilita el selector de visibilidad pública. |

### Relaciones

```
User 1 ──── N VideoList 1 ──── N Video (ordenados)
                                 │
                                 └── N ──── N Tag   (a través de videoTag/)
```
