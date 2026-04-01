import { JwtUserPayload } from "../modules/USER/user.interface";

declare global {
  namespace Express {
    interface User extends JwtUserPayload {}
  }
}
