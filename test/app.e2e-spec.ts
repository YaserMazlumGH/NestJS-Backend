import { BookmarkCreateDto } from './../src/bookmark/model/bookmark-create.dto';
import { EditUserDto } from './../src/user/dto/edit-user.dto';
import { LoginDto } from './../src/auth/dto/auth.dto';
import { RegisterDto } from './../src/auth/dto/register.dto';
import { PrismaService } from './../src/prisma/prisma.service';
import { AppModule } from './../src/app.module';
import * as pactum from 'pactum';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';

describe('App e2e', () => {

  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      })
    );
    await app.init();
    await app.listen(3001);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl("http://localhost:3001");
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('Register', () => {
      it('register test', () => {
        const dto: RegisterDto = {
          email: 'test@test.com',
          firstName: 'yaser',
          lastName: 'test',
          password: '12345678'
        }
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201); //inspect() is data
      });
      it('register throw if password empty', () => {
        const ld: LoginDto = {
          email: 'test@test.com',
          password: ''
        };
        return pactum.spec().post('/auth/signup').withBody(ld).expectStatus(400);
      });
      it('register throw if email empty', () => {
        const ld: LoginDto = {
          email: '',
          password: '12345678'
        };
        return pactum.spec().post('/auth/signup').withBody(ld).expectStatus(400);
      });
    });
    describe('Login', () => {
      it('login test', () => {
        const ld: LoginDto = {
          email: 'test@test.com',
          password: '12345678'
        };
        return pactum.spec().post('/auth/signin').withBody(ld).expectStatus(200).stores('userToken', 'access_token');
      });
      it('login throw if password empty', () => {
        const ld: LoginDto = {
          email: 'test@test.com',
          password: ''
        };
        return pactum.spec().post('/auth/signin').withBody(ld).expectStatus(400);
      });
      it('login throw if email empty', () => {
        const ld: LoginDto = {
          email: '',
          password: ''
        };
        return pactum.spec().post('/auth/signin').withBody(ld).expectStatus(400);
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get me test', () => {
        return pactum.spec().get('/users/me').withHeaders({ Authorization: 'Bearer $S{userToken}' }).expectStatus(200)
      });
    });
    describe('Edit user', () => {
      it('edit user test', () => {
        const editUser: EditUserDto = {
          email: 'test@test.com',
          firstName: 'upgrade name',
          lastName: 'upgrade lastname'
        }
        return pactum.spec().patch('/users').withHeaders({ Authorization: 'Bearer $S{userToken}' }).withBody(editUser).expectStatus(200).expectBodyContains(editUser.firstName).inspect()
      });
    });
  });

  describe('Bookmark', () => {
    describe('Get empty bookmark', () => {
      it('should get bookmarks test', () => {
        return pactum.spec().get('/bookmarks/getlist').withHeaders({ Authorization: 'Bearer $S{userToken}' }).expectStatus(200);
      });
    });
    describe('Create bookmark', () => {
      const data: BookmarkCreateDto = {
        link: 'www.yasermazlum.com',
        title: 'kendi linkim',
        description: 'link aciklaması'
      };
      it('should create bookmarks test', () => {
        return pactum.spec().post('/bookmarks/').withBody(data).withHeaders({ Authorization: 'Bearer $S{userToken}' }).expectStatus(201).stores('bookmarkId', 'id');
      })
    });
    describe('Get bookmark by id', () => {
      it('should get bookmark by id', () => {
        return pactum.spec().get('/bookmarks/{id}').withPathParams('id', '$S{bookmarkId}').withHeaders({ Authorization: 'Bearer $S{userToken}' }).expectStatus(200).expectBodyContains('$S{bookmarkId}');
      })
    });
    describe('Get edit bookmark by id', () => {
      it('should edit bookmark', () => {
        return pactum.spec().patch('/bookmarks/{id}').withPathParams('id', '$S{bookmarkId}').withHeaders({ Authorization: 'Bearer $S{userToken}' }).expectStatus(200).expectBodyContains('$S{bookmarkId}');
      });
    });
    describe('Get delete bookmark by id', () => {
      it('should delete bookmark', () => {
        return pactum.spec().delete('/bookmarks/{id}').withPathParams('id', '$S{bookmarkId}').withHeaders({ Authorization: 'Bearer $S{userToken}' }).expectStatus(204);
      });


      it('should get empty bookmarks', () => {
        return pactum.spec().get('/bookmarks/getlist').withHeaders({ Authorization: 'Bearer $S{userToken}' }).expectStatus(200).expectJsonLength(0);
      });
    });
  });

  it.todo('app module test')
})