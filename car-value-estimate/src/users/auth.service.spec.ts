import { Test } from "@nestjs/testing";
import { User } from "./user.entity";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    // Create fake copy of Users Service
    const fakeUsersService: Partial<UsersService> = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) => Promise.resolve({id: 1, email, password} as User),
    }
  
    const module = Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();
  
    service = (await module).get(AuthService);
  });
  
  it ('Can Create an Instance of Auth Service', async () => {
    expect(service).toBeDefined();
  });

  it ('Creates a New User with Salted and Hashed Password', async() => {
    const user = await service.signup('test@test.com', 'test@123');

    expect(user.password).not.toBe('test@123');
  const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  })

});