import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {

    }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()

        try {
            const { jwt } = request.cookies
            const { scope } = await this.jwtService.verify(jwt)

            return this.isAmbassador(scope,request) || this.isAdmin(scope,request)
        }catch(error) {
            console.log(error)

            return false
        }
    }

    private isAmbassador(scope, request): boolean {
        const is_ambassador = request.path.toString().indexOf('api/ambassador') >= 0

        return is_ambassador && scope === 'ambassador'
    }

    private isAdmin(scope, request): boolean {
        const is_admin = request.path.toString().indexOf('api/admin') >= 0

        return is_admin && scope === 'admin'
    }

}
