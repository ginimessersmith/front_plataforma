export interface AllPointsByUserInterface {
  id: number;
  action: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
  UserId: number;
}

// export enum Action {
//   CompartirRecursos = "Compartir recursos",
//   IniciarSesion = "Iniciar Sesion",
//   PublicarPregunta = "Publicar pregunta",
//   RegistrarseComoUsuario = "Registrarse como usuario",
//   ResponderALaPregunta = "Responder a la pregunta",
// }
