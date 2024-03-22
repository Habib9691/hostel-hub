import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import request from "supertest";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { MealController } from "../meal.controller";
import { MealService } from "../meal.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  breakfast: 42.424242424,
  createdAt: new Date(),
  dinner: 42,
  guestFees: 42,
  guestMeal: 42.424242424,
  id: "exampleId",
  lunch: 42,
  updatedAt: new Date(),
  updatedBy: new Date(),
};
const CREATE_RESULT = {
  breakfast: 42.424242424,
  createdAt: new Date(),
  dinner: 42,
  guestFees: 42,
  guestMeal: 42.424242424,
  id: "exampleId",
  lunch: 42,
  updatedAt: new Date(),
  updatedBy: new Date(),
};
const FIND_MANY_RESULT = [
  {
    breakfast: 42.424242424,
    createdAt: new Date(),
    dinner: 42,
    guestFees: 42,
    guestMeal: 42.424242424,
    id: "exampleId",
    lunch: 42,
    updatedAt: new Date(),
    updatedBy: new Date(),
  },
];
const FIND_ONE_RESULT = {
  breakfast: 42.424242424,
  createdAt: new Date(),
  dinner: 42,
  guestFees: 42,
  guestMeal: 42.424242424,
  id: "exampleId",
  lunch: 42,
  updatedAt: new Date(),
  updatedBy: new Date(),
};

const service = {
  createMeal() {
    return CREATE_RESULT;
  },
  meals: () => FIND_MANY_RESULT,
  meal: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};
const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("Meal", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: MealService,
          useValue: service,
        },
      ],
      controllers: [MealController],
      imports: [ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /meals", async () => {
    await request(app.getHttpServer())
      .post("/meals")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
        updatedBy: CREATE_RESULT.updatedBy.toISOString(),
      });
  });

  test("GET /meals", async () => {
    await request(app.getHttpServer())
      .get("/meals")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
          updatedBy: FIND_MANY_RESULT[0].updatedBy.toISOString(),
        },
      ]);
  });

  test("GET /meals/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/meals"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /meals/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/meals"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
        updatedBy: FIND_ONE_RESULT.updatedBy.toISOString(),
      });
  });

  test("POST /meals existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/meals")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
        updatedBy: CREATE_RESULT.updatedBy.toISOString(),
      })
      .then(function () {
        agent
          .post("/meals")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
