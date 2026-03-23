# Mòdul de Seguretat: JWT i Control de Rols (RBAC)

Aquest mòdul gestiona l'autenticació i l'autorització dels usuaris mitjançant JSON Web Tokens i la verificació de permisos al backend.

## 📺 Vídeo de l'exercici
Pots veure la demostració del funcionament aquí: [https://youtu.be/7Dqnf_b1mFQ](https://youtu.be/7Dqnf_b1mFQ)

## 🛠️ Implementació Tècnica
- **Backend:** Middleware `checkRole.ts` per protegir rutes d'administrador.
- **Tokens:** Inclusió del camp `role` en el payload de l'Access Token i Refresh Token.
- **Frontend:** Protecció de rutes amb `authGuard` i servei d'administració a Angular.

## 🤖 Declaració d'ús d'IA Generativa
**IA Generativa:** ChatGPT / Gemini (Google)

**Parts del codi assistides per IA:**
* **Disseny del Payload:** Utilitzada per definir l'estructura del token JWT que inclou el camp `role`, permetent una validació eficient sense consultes recurrents a la base de dades.
* **Middleware de Verificació:** Guia en la creació del middleware `checkRole.ts` per gestionar correctament els permisos i retornar errors 403 (Accés denegat) de forma estandarditzada.
* **Lògica de Rutes Protegides:** Assistència en la configuració de les rutes d'Angular per sincronitzar la validació del rol del client amb la del servidor.
Vuestro trabajo consistirá en completar el flujo de información para que el Frontend (Angular) sepa en todo momento quién está conectado.

### Tareas en el Backend (Este repo)
Deberéis añadir la lógica para mantener un registro de quién está online.
* **Pista 1:** Abrid donde estéis escuchando la principal conexión de io (`io.on('connection', socket => {...})`).
* **Pista 2:** ¿Qué tal si usamos un `Array` o un `Map` (ej. `let usuariosConectados = []`) para ir guardando a los usuarios que entran?
* **Pista 3:** Emitid (`io.emit`) un evento a **todos** los clientes cada vez que alguien nuevo se conecte o alguien se desconecte (`socket.on('disconnect')`), enviándoles esa lista actualizada.

### Tareas en el Frontend (Vuestro proyecto Angular)
En la parte del cliente tendréis que escuchar ese evento.
* **Pista 1:** En el servicio de chat (`chat.service.ts`), cread una función que escuche el evento que emite el backend con la lista de usuarios.
* **Pista 2:** En el componente del chat, suscribíos a ese evento para guardar la lista en una variable local.
* **Pista 3:** Renderizad en el HTML (usando `@for` o `*ngFor`) esa lista de usuarios en una barra lateral.

---

## Instalación y ejecución

Para correr este servidor base e ir probando vuestros cambios:

```bash
# Instalar dependencias 
npm install

# Iniciar el servidor (con nodemon y recarga automática)
npm run dev
```

Recordad que necesitáis tener vuestra base de datos de MongoDB corriendo (ver archivo `.env`). El servidor arrancará por defecto en el puerto `1337`.

¡Mucho ánimo y a programar! 🚀
