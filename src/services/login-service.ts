import * as userService from '../services/user-service';
import bcrypt from 'bcrypt';
import * as jwt from '../util/jwt';
import ApiError from '../util/api-error';

export const login = async (user:any) => {
  try {
    const { email, password } = user;
    const storedUser = await userService.getByEmail(email);

    if (!storedUser) {
      throw ApiError.unauthorized('Bad Credentials: Invalid email');
    }

    const hashedPassword = storedUser.password;
    const areEqualPasswords = await bcrypt.compare(password, hashedPassword);

    if (!areEqualPasswords) {
      throw ApiError.unauthorized('Bad Credentials: Invalid password');
    }

    const accessToken = await jwt.generateAccessToken(email);
    const refreshToken = await jwt.generateRefreshToken(email);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (error) {
    throw ApiError.from(error);
  }
};
