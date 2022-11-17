import { Test } from "@nestjs/testing";
import { User } from "./user.entity";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>

  beforeEach(async () => {
    const users: User[] = [];

    // Create fake copy of Users Service
    // fakeUsersService = {
    //   find: () => Promise.resolve([]),
    //   create: (email: string, password: string) => Promise.resolve({id: 1, email, password} as User),
    // }
    
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter(user => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {id: Math.floor(Math.random() * 999999), email, password} as User
        users.push(user);
        return Promise.resolve(user);
      }
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

  it ('Creates a New User with Salted and Hashed Password', async () => {
    const user = await service.signup('test@test.com', 'test@123');

    expect(user.password).not.toBe('test@123');
  const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  })

  // it ('Throws an error if user signs up with an email that is in use', async (done) => {
  it ('Throws an error if user signs up with an email that is in use', async  () => {
    // Without More Intelligent tests
    // fakeUsersService.find = () => Promise.resolve([{id: 1, email: 'a', password: 'b'} as User]);
    // Old way
    // try {
    //   await service.signup('test@test.com', 'test@123');
    // } catch(err) {
    //   done();
    // }
    await service.signup('test@test.com', 'test@123');
    await expect(service.signup('test@test.com', 'test@123')).rejects.toThrow(BadRequestException,);
  });

  it ('Throws an error if user signs in with an unused email', async () => {
    await expect(
      service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
      ).rejects.toThrow(NotFoundException);
  });

  it ('Throws an error if an Invalid password is provided', async () => {
    // Without More Intelligent tests
    // fakeUsersService.find = () =>
    //   Promise.resolve([{id: 1, email: 'test@test.com', password: 'test'} as User])
    await service.signup('test@test.com', 'password');
    await expect(
      service.signin('test@test.com', 'password1')
    ).rejects.toThrow(BadRequestException);
  });

  it ('Returns a password if correct password is provided', async () => {
    // Without More Intelligent tests
    // fakeUsersService.find = () =>
    //   Promise.resolve([{id: 1, email: 'test@test.com', password: 'test'} as User])
    await service.signup('test@test.com', 'test');

    const user = await service.signin('test@test.com', 'test');
    expect(user).toBeDefined();
  });

});