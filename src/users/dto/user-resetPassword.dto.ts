import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @MinLength(6)
  newPassword: string; // Add validation if needed (e.g., password length)
}
