import {  Injectable } from '@nestjs/common'

@Injectable()
export class UsuarioContextoServico {
  userId: string
  sellerId: string
  usuarioId: string
  perfil: string
  keycloakId: string
  email: string
  nome: string
}
