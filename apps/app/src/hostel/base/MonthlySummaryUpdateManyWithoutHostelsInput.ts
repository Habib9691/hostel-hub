/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { MonthlySummaryWhereUniqueInput } from "../../monthlySummary/base/MonthlySummaryWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class MonthlySummaryUpdateManyWithoutHostelsInput {
  @Field(() => [MonthlySummaryWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [MonthlySummaryWhereUniqueInput],
  })
  connect?: Array<MonthlySummaryWhereUniqueInput>;

  @Field(() => [MonthlySummaryWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [MonthlySummaryWhereUniqueInput],
  })
  disconnect?: Array<MonthlySummaryWhereUniqueInput>;

  @Field(() => [MonthlySummaryWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [MonthlySummaryWhereUniqueInput],
  })
  set?: Array<MonthlySummaryWhereUniqueInput>;
}

export { MonthlySummaryUpdateManyWithoutHostelsInput as MonthlySummaryUpdateManyWithoutHostelsInput };
