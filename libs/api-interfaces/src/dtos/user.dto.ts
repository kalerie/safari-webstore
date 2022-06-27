export class UserDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  password: string;
  readonly gender?: string;
  readonly dateOfBirth?: string;
  readonly newsletters: boolean;
  favorites?: string[]
}

export type CreateUserDto = UserDto;
export type UpdateUserDto = Partial<UserDto>;
