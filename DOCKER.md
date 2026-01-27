# Docker

Este repo (frontend) incluye un `docker-compose.full.yml` para levantar **frontend + backend + DB** en una sola orden.

## Requisitos
- Docker Desktop
- Tener **ambos repos** en el mismo directorio padre:
  - `frontend-sistema-de-peticiones-main`
  - `sicier`

Ejemplo:
```
C:\Users\braya\OneDrive\Escritorio\
  +- frontend-sistema-de-peticiones-main
  +- sicier
```

## Levantar todo
Desde este repo:
```
docker compose -f docker-compose.full.yml up --build
```

## URLs
- Frontend: http://localhost:5173
- Backend: http://localhost:8080/sicier/api/v1
- DB: localhost:5432

## Produccion (frontend)
Si quieres servir el frontend en Nginx:
```
docker build -t peticiones-frontend .
docker run -p 80:80 peticiones-frontend
```
