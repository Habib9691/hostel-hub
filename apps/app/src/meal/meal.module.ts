import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { MealModuleBase } from "./base/meal.module.base";
import { MealService } from "./meal.service";
import { MealController } from "./meal.controller";

@Module({
  imports: [MealModuleBase, forwardRef(() => AuthModule)],
  controllers: [MealController],
  providers: [MealService],
  exports: [MealService],
})
export class MealModule {}
