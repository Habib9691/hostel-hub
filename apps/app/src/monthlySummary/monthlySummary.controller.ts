import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { MonthlySummaryService } from "./monthlySummary.service";
import { MonthlySummaryControllerBase } from "./base/monthlySummary.controller.base";

@swagger.ApiTags("monthlySummaries")
@common.Controller("monthlySummaries")
export class MonthlySummaryController extends MonthlySummaryControllerBase {
  constructor(
    protected readonly service: MonthlySummaryService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
