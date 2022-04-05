import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { UsuarioContextoServico } from '../servico/usuario-context.servico'

@Injectable()
export class RequerUsuarioContexto implements NestInterceptor {

  constructor(private usuarioContextoServico: UsuarioContextoServico) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest()

    this.usuarioContextoServico.usuarioId = request.headers['x-nodis-usuarioid'];
    this.usuarioContextoServico.email = request.headers['x-nodis-email'];
    this.usuarioContextoServico.sellerId = request.headers['x-nodis-sellerid'];
    this.usuarioContextoServico.keycloakId = request.headers['X-nodis-keycloakid'];
    this.usuarioContextoServico.perfil = request.headers['X-nodis-perfil'];
    this.usuarioContextoServico.nome = request.headers['X-nodis-nome'];
    this.usuarioContextoServico.userId = request.headers['X-nodis-userid'];

    return next.handle()
  }
}
