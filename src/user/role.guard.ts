import { CanActivate, ExecutionContext, mixin, Type } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Role } from "./dto/user.dto";

export function RoleGuard(role: Role): Type<CanActivate>{
    class RoleGuardMixin extends JwtAuthGuard{
      async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (user && user.role) {
          return user.role === role;
        }
        return false;
      }
    }
   
    return RoleGuardMixin;
  }
   
  export default RoleGuard;