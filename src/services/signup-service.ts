import * as userService from '../services/user-service';
import * as roleService from '../services/role-service';
import * as cartService from '../services/cart-service';
import { Roles } from '../util/roles';
import bcrypt from 'bcrypt';
import ApiError from '../util/api-error';
import { IUser } from '../interfaces/user.interface';



export const signup = async (user: IUser) => {
  try {
    const { email, password, roleName } = user;
    const storedUser = await userService.getByEmail(email);
    const storedRole = await roleService.searchOne({ name: roleName });
    if (storedUser) {
      throw ApiError.badRequest(
        'This email is already taken, choose another one'
      );
    }
    if (!storedRole) {
      const availableRoles = ['admin', 'seller', 'customer'];
      if (!availableRoles.includes(roleName)) {
        throw ApiError.badRequest(
          'Invalid role. Choose from [admin, seller, customer]'
        );
      }
      throw ApiError.badRequest('This role does not exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.roleId = storedRole.id;

    const savedUser = await userService.save(user);

    if (roleName === Roles.CUSTOMER) {
      await cartService.save(savedUser);
    }

  } catch (error) {
    throw ApiError.from(error);
  }
};
