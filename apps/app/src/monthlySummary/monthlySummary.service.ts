import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { MonthlySummaryServiceBase } from "./base/monthlySummary.service.base";

@Injectable()
export class MonthlySummaryService extends MonthlySummaryServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
