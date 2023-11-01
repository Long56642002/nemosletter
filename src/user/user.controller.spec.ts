import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ConfigModule.forRoot({ isGlobal: true })],
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideGuard(JwtGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('getInformation', () => {
    it('should return the user information', () => {
      const user: User = { id: 1, name: 'John Doe', email: 'john@example.com', createdAt: new Date(), updatedAt: new Date(), sub: 'sub', picture: 'picture', userType: 'standard' };
      jest.spyOn(userService, 'findUserByEmailOrSub').mockResolvedValue(user);

      const result = controller.getInformation(user);

      expect(result).toEqual(user);
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const users: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', createdAt: new Date(), updatedAt: new Date(), sub: 'sub', picture: 'picture', userType: 'standard' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', createdAt: new Date(), updatedAt: new Date(), sub: 'sub', picture: 'picture', userType: 'standard' },
      ];
      jest.spyOn(userService, 'getAllUsers').mockResolvedValue(users);

      const result = await controller.getAllUsers();

      expect(result).toEqual(users);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const user: User = { id: 1, name: 'John Doe', email: 'john@example.com', createdAt: new Date(), updatedAt: new Date(), sub: 'sub', picture: 'picture', userType: 'standard' };
      const createUserDto: CreateUserDto = { name: 'John Doe', email: 'john@example.com', sub: 'sub' };
      jest.spyOn(userService, 'createUser').mockResolvedValue(user);

      const result = await controller.createUser(user, createUserDto);

      expect(result).toEqual(user);
    });
  });
});
