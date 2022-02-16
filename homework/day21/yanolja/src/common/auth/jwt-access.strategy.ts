import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtAccessStrategy extends PassportStrategy(Strategy,'access'){

  constructor(){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myAccessKey'
    })
  }

  async validate(payload: any){ 
    return{
      id: payload.sub,
      email: payload.email
    }
  }
}