import { Test } from "@nestjs/testing";
import { User } from "./user.entity";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";

it ('Can Create an Instance of Auth Service', async () => {
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

  const service = (await module).get(AuthService);

  expect(service).toBeDefined();
});