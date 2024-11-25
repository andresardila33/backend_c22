import { UUIDTypes } from 'uuid';

export class User {
  public id: UUIDTypes;
  public firstName: string;
  public lastName: string;
  public userName: string;
  public password: string;
  public email: string;
  public isActive: boolean;
  public role: string[];
}
