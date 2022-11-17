import { Test } from "@nestjs/testing";
import { User } from "./user.entity";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>

  beforeEach(async () => {
    // Create fake copy of Users Service
    fakeUsersService = {
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

  it ('Creates a New User with Salted and Hashed Password', async () => {
    const user = await service.signup('test@test.com', 'test@123');

    expect(user.password).not.toBe('test@123');
  const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  })

  // it ('Throws an error if user signs up with an email that is in use', async (done) => {
  it ('Throws an error if user signs up with an email that is in use', async  () => {
    fakeUsersService.find = () => Promise.resolve([{id: 1, email: 'a', password: 'b'} as User]);
    // Old way
    // try {
    //   await service.signup('test@test.com', 'test@123');
    // } catch(err) {
    //   done();
    // }
    await expect(service.signup('test@test.com', 'test@123')).rejects.toThrow(BadRequestException,);
  });

  it ('Throws an error if user signs in with an unused email', async () => {
    await expect(
      service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
      ).rejects.toThrow(NotFoundException);
  });

  it ('Throws an error if an Invalid password is provided', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([{id: 1, email: 'test@test.com', password: 'test'} as User])
    await expect(
      service.signin('test@test.com', 'password')
    ).rejects.toThrow(BadRequestException);
  });

  it ('Returns a password if correct password is provided', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([{id: 1, email: 'test@test.com', password: 'test'} as User])
    const user = await service.signin('test@test.com', 'test');
    expect(user).toBeDefined();
  });

});