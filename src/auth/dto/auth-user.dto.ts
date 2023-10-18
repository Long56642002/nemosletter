import { User } from "@prisma/client";

export interface AuthUser {
  user: User
  accessToken: string 
}