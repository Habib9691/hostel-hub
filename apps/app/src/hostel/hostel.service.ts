import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { HostelServiceBase } from "./base/hostel.service.base";

@Injectable()
export class HostelService extends HostelServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
