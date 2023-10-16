import { User } from "@prisma/client";
import { Token } from "../interfaces/token.interface";

export interface AuthUser extends User, Token {}