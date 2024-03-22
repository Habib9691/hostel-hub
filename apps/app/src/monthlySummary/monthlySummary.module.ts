import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { MonthlySummaryModuleBase } from "./base/monthlySummary.module.base";
import { MonthlySummaryService } from "./monthlySummary.service";
import { MonthlySummaryController } from "./monthlySummary.controller";

@Module({
  imports: [MonthlySummaryModuleBase, forwardRef(() => AuthModule)],
  controllers: [MonthlySummaryController],
  providers: [MonthlySummaryService],
  exports: [MonthlySummaryService],
})
export class MonthlySummaryModule {}
