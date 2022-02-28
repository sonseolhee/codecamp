import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtRefreshStrategy extends PassportStrategy(Strategy,'refresh'){

  constructor(){
    super({
      jwtFromRequest: (req) =>{
        const cookie = req.headers.cookies
        return cookie.replace('refreshToken=', '')
      },
      secretOrKey: 'myRefreshKey'
    })
  }

  async validate(payload: any){ 
    return{
      id: payload.sub,
      email: payload.email
    }
  }
} 