# Mòdul de Comunicació: Xat Global amb WebSockets

Implementació d'un sistema de missatgeria instantània global i gestió de presència d'usuaris en temps real utilitzant Socket.io.

## 📺 Vídeo de l'exercici
Pots veure la demostració del funcionament aquí: [https://youtu.be/7Dqnf_b1mFQ](https://youtu.be/7Dqnf_b1mFQ)

## 🚀 Funcionalitats Clau
- **Llista d'usuaris actius:** Seguiment en temps real de qui està connectat.
- **Feedback visual:** Indicadors de "l'usuari està escrivint".
- **Persistència:** Missatges guardats a MongoDB abans de l'emissió.

## 🤖 Declaració d'ús d'IA Generativa
**IA Generativa:** ChatGPT / Gemini (Google)

**Parts del codi assistides per IA:**
* **Gestió de Memòria amb Maps:** Suport en l'optimització de l'objecte `Map` per gestionar el llistat d'usuaris actius, implementant una lògica que evita duplicats si un usuari té múltiples sessions o pestanyes obertes.
* **Estructura d'Esdeveniments Broadcast:** Configuració dels mètodes `socket.broadcast.emit` per als esdeveniments de tipus `typing`, garantint que el feedback visual arribi correctament a tots els clients menys a l'emissor.
* **Refactorització a Xat Global:** Assistència en la transformació del flux de dades per passar d'un model de sales tancades a una emissió global mitjançant `this.io.emit`, simplificant l'arquitectura del servei.
