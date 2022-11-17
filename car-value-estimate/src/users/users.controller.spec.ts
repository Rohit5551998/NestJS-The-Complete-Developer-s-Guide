import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({id, email: 'test@test.com', password: 'test'} as User);
      },
      find: (email: string) => {
        return Promise.resolve([{id: 1, email, password: 'test'} as User]);
      },
      remove: (id: number) => {
        return Promise.resolve({id, email: 'test@test.com', password: 'test'} as User);
      },
      update: (id: number) => {
        return Promise.resolve({id, email: 'test@test.com', password: 'test'} as User);
      },
    };
    fakeAuthService = {
      signup: (email: string, password: string) => {
        return Promise.resolve({id: 1, email, password} as User);
      },
      signin: (email: string, password: string) => {
        return Promise.resolve({id: 1, email, password} as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should Find all Users with the given email', async () => {
    const users = await controller.findAllUsers('test@test.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('test@test.com');
  });

  it('Should Find the User with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined
    expect(user.id).toEqual(1);
  });

  it('Throws and Error if User with the given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('Sign In Updates Session Object and Returns User', async () => {
    const session = { userId: -10 };
    const user = await controller.signin({email: 'test@test.com', password: 'test'}, session);
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });

});
