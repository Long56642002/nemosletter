import { User } from "@prisma/client";

export interface CreateToken {
  sub: User['sub']
}