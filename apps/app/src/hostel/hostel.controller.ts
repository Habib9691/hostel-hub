import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { HostelService } from "./hostel.service";
import { HostelControllerBase } from "./base/hostel.controller.base";

@swagger.ApiTags("hostels")
@common.Controller("hostels")
export class HostelController extends HostelControllerBase {
  constructor(
    protected readonly service: HostelService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
