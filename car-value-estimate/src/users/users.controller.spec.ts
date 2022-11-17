import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

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
      // signup: () => {},
      // signin: () => {},
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
});
