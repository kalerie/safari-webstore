import { User } from '@safari-store/api-interfaces';

export class LoginResultDto {
  readonly user: User;
  readonly token: string;
}
