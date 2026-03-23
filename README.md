🌐 Mòdul de Comunicació: Xat Global (WebSockets)
Aquest mòdul permet la comunicació en temps real entre tots els usuaris mitjançant la tecnologia Socket.io, gestionant tant l'enviament de missatges com la presència d'usuaris.

📺 Vídeo de l'exercici
Pots veure la demostració del xat en funcionament i l'explicació del codi aquí:
👉 Enllaç al vídeo de l'exercici

🚀 Implementació Tècnica
Backend (Node.js & Socket.io)
Gestió de Connexions: Escolta activa de nous clients i vinculació del socket.id amb la identitat de l'usuari.

Emissió Global: Configuració d'esdeveniments per enviar missatges a tots els usuaris connectats de forma simultània.

Control de Presència: Actualització automatitzada de la llista d'usuaris actius cada vegada que algú entra o surt del xat.

Frontend (Angular)
Servei Reactiu: Ús d'Observables per escoltar els missatges nous i l'estat dels usuaris des del servidor.

Interfície Dinàmica: Llista d'usuaris en línia que s'actualitza automàticament a la barra lateral sense necessitat de recarregar la pàgina.

🤖 Declaració d'ús d'IA Generativa
IA Generativa: ChatGPT / Gemini (Google)

Parts del codi assistides per IA:

Gestió de la llista d'usuaris i duplicats (Backend/Frontend):

Neteja de memòria: He utilitzat la IA per crear la lògica que esborra automàticament l'usuari de la llista quan tanca la pestanya o es desconnecta.

Control de sessions: M'ha ajudat a filtrar la llista perquè un mateix usuari no aparegui repetit si té el xat obert en diverses pestanyes alhora.

Sincronització: M'ha servit de guia per fer que la llista d'usuaris s'enviï a tothom immediatament després de qualsevol canvi en l'estat de connexió.

Avisos del servidor i Logs (Backend):

Traçabilitat: Vaig demanar a la IA com posar missatges informatius personalitzats que surtin per la consola del servidor.

Depuració en viu: Això m'ha permès veure en temps real quan es connectava un usuari o quan s'enviava un missatge, facilitant molt la detecció d'errors durant les proves.

Format de dades: M'ha ajudat a estructurar la informació que es mostra als logs (com el nom de l'usuari i el seu ID) per fer-los més llegibles i útils.
