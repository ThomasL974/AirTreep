import { UnauthorizedException } from "@nestjs/common";

export class AuthenticationFailedError extends UnauthorizedException {
}