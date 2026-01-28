# Docker

Este repo incluye dos formas de levantar todo:

## Opcion A: Solo Docker 
no necesitan clonar backend ni compilar.

1) Crear `docker-compose.yml` (ya incluido en este repo).
2) Ejecutar:
```
docker compose up -d
```
3) Abrir:
- Frontend: http://localhost:5173
- Backend: http://localhost:8080/sicier/api/v1

Notas importantes:
- El frontend en Nginx **no lee** `VITE_API_URL` en runtime.
- Si cambias la URL del backend, **debes reconstruir y publicar** la imagen del frontend con:
```
$env:VITE_API_URL="http://localhost:8080/sicier/api/v1"
docker build -t brayam223/peticiones-frontend:latest .
docker push brayam223/peticiones-frontend:latest
```

## Opcion B: Desarrollo local (frontend + backend + DB)
Requiere ambos repos en el mismo directorio:
```
C:\Users\braya\OneDrive\Escritorio\
  +- frontend-sistema-de-peticiones-main
  +- sicier
```

Ejecuta:
```
docker compose -f docker-compose.full.yml up --build
```

URLs:
- Frontend: http://localhost:5173
- Backend: http://localhost:8080/sicier/api/v1
- DB: localhost:5432
