import { JwtUserPayload } from "../modules/USER/rider.interface";

declare global {
  namespace Express {
    interface User extends JwtUserPayload {}
  }
}
