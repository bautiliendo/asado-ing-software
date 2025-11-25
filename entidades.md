Entidades finales
1️⃣ Evento

Representa cada asado.

Evento {
  Long id;
  String nombre;       // "Asado del sábado"
  LocalDate fecha;     // 2025-11-30
  String lugar;        // "Casa de Bauti"
  String descripcion;  // opcional
}

2️⃣ Invitado

Personas que participan en los asados.

Invitado {
  Long id;
  String nombre;  // "Juan Pérez"
  String alias;   // "Juani"
}


La relación con el evento la manejamos vía Gasto: un invitado participa de un evento si tiene al menos un gasto asociado a ese evento.

3️⃣ Gasto

Cada compra que hace un invitado para un evento.

Gasto {
  Long id;
  Long eventoId;      // FK a Evento
  Long invitadoId;    // FK a Invitado
  String descripcion; // "Carne y chorizos"
  BigDecimal monto;   // 18000.00
}


Con esto tenés 3 entidades claras: cumple perfecto la consigna.

🔗 Endpoints finales
📂 Endpoints de Evento

Base: /api/eventos

GET /api/eventos
Lista todos los eventos.

GET /api/eventos/{id}
Devuelve un evento por id.

POST /api/eventos
Crea un nuevo evento.

PUT /api/eventos/{id}
Actualiza un evento existente.

DELETE /api/eventos/{id}
Elimina un evento.

🔹 Opcionales recomendados para el TP:

GET /api/eventos/{eventoId}/gastos
Lista todos los gastos de ese evento.

GET /api/eventos/{eventoId}/invitados
Lista de invitados que tienen algún gasto en ese evento (se calcula por los Gasto).

👥 Endpoints de Invitado

Base: /api/invitados

GET /api/invitados
Lista todos los invitados.

GET /api/invitados/{id}
Devuelve un invitado por id.

POST /api/invitados
Crea un nuevo invitado.

PUT /api/invitados/{id}
Actualiza los datos del invitado.

DELETE /api/invitados/{id}
Elimina un invitado.

🔹 Opcional:

GET /api/invitados/{invitadoId}/gastos
Lista todos los gastos de ese invitado (en todos los eventos).

💸 Endpoints de Gasto

Base: /api/gastos

GET /api/gastos
Lista todos los gastos.

GET /api/gastos/{id}
Devuelve un gasto por id.

POST /api/gastos
Crea un nuevo gasto.

{
  "eventoId": 1,
  "invitadoId": 3,
  "descripcion": "Bebidas",
  "monto": 12000
}


PUT /api/gastos/{id}
Actualiza un gasto.

DELETE /api/gastos/{id}
Elimina un gasto.