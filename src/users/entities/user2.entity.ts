import { UUIDTypes } from 'uuid';

export class User2 {
  public id: UUIDTypes;
  public firstName: string;
  public lastName: string;
  public userName: string;
  public email: string;
  public isActive: boolean;
  public role: string[];
}
