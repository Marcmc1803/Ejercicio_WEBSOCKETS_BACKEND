import { Server as SocketIOServer, Socket } from 'socket.io';
import Logging from '../library/Logging';
import MensajeModel, { IMensajeModel } from '../models/Mensaje';

export class MensajeService {
    private io: SocketIOServer;
    private usuariosConectados: Map<string, { id: string, name: string }> = new Map();

    constructor(io: SocketIOServer) {
        this.io = io;
    }

    // Aquí configurem tots els sockets
    public inicializarSockets(): void {
        this.io.on('connection', (socket: Socket) => {
            Logging.info(`[Socket] Nou client: ${socket.id}`);

            // Quan l'usuari entra al xat
            socket.on('join-chat', (data: { usuarioId: string, nombre: string }) => {
                Logging.info(`[Socket] Event join-chat rebut: ${JSON.stringify(data)}`);
                if (data && data.usuarioId) {
                    // Guardem la info de l'usuari
                    this.usuariosConectados.set(socket.id, { 
                        id: data.usuarioId, 
                        name: data.nombre 
                    });

                    Logging.info(`[Socket] L'usuari ${data.nombre} s'ha unit al xat`);
                    
                    // Avisem a tothom de la nova llista
                    this.enviarListaUsuarios();
                } else {
                    Logging.error(`[Socket] Error: no hi ha usuarioId`);
                }
            });

            // Quan algú està escrivint
            socket.on('typing', (data: { usuarioId: string, nombre: string, usuarioName?: string }) => {
                const name = data.usuarioName || data.nombre;
                Logging.info(`[Socket] ${name} està escrivint...`);
                // Ho enviem a tots menys a mi mateix
                socket.broadcast.emit('user-typing', data);
            });

            // Quan deixa d'escriure
            socket.on('stop-typing', (data: { usuarioId: string, nombre: string }) => {
                socket.broadcast.emit('user-stop-typing', data);
            });

            // Quan ens arriba un missatge
            socket.on('message', async (data: { usuario: string, organizacion: string, contenido: string }) => {
                Logging.info(`[Socket] Missatge de ${data.usuario}`);
                try {
                    // El guardem a la base de dades
                    const nuevoMensaje = await this.guardarMensaje(
                        data.contenido,
                        data.usuario,
                        data.organizacion
                    );

                    Logging.info(`[Socket] Enviant missatge a tothom`);
                    // El reenviem a tothom
                    this.io.emit('message', nuevoMensaje);
                } catch (error) {
                    Logging.error(`[Socket] Error guardant: ${error}`);
                    socket.emit('error', { message: 'No s\'ha pogut enviar' });
                }
            });

            // Per marcar el missatge com a llegit
            socket.on('mark-as-read', async (mensajeId: string) => {
                try {
                    await MensajeModel.findByIdAndUpdate(mensajeId, { leido: true });
                } catch (error) {
                    Logging.error(`[Socket] Error mark-as-read: ${error}`);
                }
            });

            // Quan algú plega
            socket.on('disconnect', () => {
                const user = this.usuariosConectados.get(socket.id);
                if (user) {
                    Logging.info(`[Socket] L'usuari ${user.name} ha marxat`);
                    this.usuariosConectados.delete(socket.id);
                    this.enviarListaUsuarios(); // Actualitzem la llista de fora
                } else {
                    Logging.info(`[Socket] Desconnexió anònima: ${socket.id}`);
                }
            });
        });
    }

    // Funció per enviar qui està online a tothom
    private enviarListaUsuarios(): void {
        const listaAll = Array.from(this.usuariosConectados.values());
        
        // Treiem duplicats si té vàries pestanyes obertes
        const listaUnica = Array.from(new Map(listaAll.map(u => [u.id, u])).values());
        
        Logging.info(`[Socket] Enviant llista (${listaUnica.length} usuarios)`);
        this.io.emit('active-users', listaUnica);
    }

    // Guardar missatget a la BD
    public async guardarMensaje(
        contenido: string,
        usuarioId: string,
        organizacionId: string
    ): Promise<IMensajeModel> {
        const mensaje = new MensajeModel({
            contenido,
            usuario: usuarioId,
            organizacion: organizacionId,
            leido: false
        });

        const savedMensaje = await mensaje.save();
        return await savedMensaje.populate('usuario', 'name email');
    }

    // Agafar missatges d'una org
    public async obtenerMensajesPorOrganizacion(organizacionId: string): Promise<IMensajeModel[]> {
        return await MensajeModel.find({ organizacion: organizacionId })
            .populate('usuario', 'name email')
            .sort({ createdAt: -1 });
    }

    // Veure què falta per llegir
    public async obtenerMensajesNoLeidos(usuarioId: string): Promise<IMensajeModel[]> {
        return await MensajeModel.find({ usuario: usuarioId, leido: false })
            .populate('usuario', 'name email')
            .populate('organizacion', 'name');
    }
}
