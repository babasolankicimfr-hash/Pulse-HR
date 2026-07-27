# PulseHR - Multi-Tenant SaaS Platform

## Architecture & Tech Stack
- **Backend:** Java 26, Spring Boot 4.0.0
- **Frontend:** React 18 (TypeScript), Vite, Tailwind CSS, Framer Motion
- **Database:** MySQL 8.0
- **Real-Time Layer:** Spring WebSocket (STOMP over SockJS)
- **Deployment:** Multi-container Docker setup

## Running the Application

1. Make sure Docker is running on your machine.
2. In the project root (`C:\Users\babas\.gemini\antigravity\scratch\pulsehr`), run:
   ```bash
   docker-compose up --build
   ```
3. The frontend is accessible at `http://localhost:80`.
4. The backend is accessible at `http://localhost:8080`.

## API Manual & SoapUI Integration

The API uses OpenAPI 3.0 / Springdoc and exposes endpoints following the RFC 7807 problem details specification. 
All endpoints are multi-tenant and require the `X-Tenant-ID` header, although for Swagger UI they are designed as path variables `/api/v1/tenants/{tenantId}/employees` so you can easily provide the tenant ID in the path.

### Importing to SoapUI / Postman

1. Once the backend is running, the OpenAPI spec is available at:
   `http://localhost:8080/v3/api-docs`
2. Open SoapUI (or Postman).
3. Import the API definition using the above URL.
4. Set the path variable `tenantId` (e.g., `tenant-acme-corp`) for all requests.

### Endpoint Examples

- **Create Employee (POST `/api/v1/tenants/{tenantId}/employees`)**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "department": "ENGINEERING",
    "designation": "Senior Developer",
    "salary": 120000.00,
    "status": "ACTIVE"
  }
  ```

- **Get SaaS Metrics (GET `/api/v1/tenants/{tenantId}/employees/metrics`)**:
  Returns the real-time aggregated metrics for the dashboard.
