import { Request } from 'express';
import { User } from '../models/user.model';

export interface Context {
  req: Request;
  user?: User;
}
