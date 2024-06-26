import * as signupService from '../services/signup-service'
import { Request, Response , NextFunction} from 'express';
import { StatusCode } from '../util/status-code';


export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;
  try {
    await signupService.signup(user);
    res.status(StatusCode.CREATED).json({ message: 'User Sign Up' });
  } catch (error: any) {
    res.status(StatusCode.BAD_REQUEST).json(error.message);
  }
};