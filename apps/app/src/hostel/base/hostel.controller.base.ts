/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { HostelService } from "../hostel.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { HostelCreateInput } from "./HostelCreateInput";
import { Hostel } from "./Hostel";
import { HostelFindManyArgs } from "./HostelFindManyArgs";
import { HostelWhereUniqueInput } from "./HostelWhereUniqueInput";
import { HostelUpdateInput } from "./HostelUpdateInput";
import { MonthlySummaryFindManyArgs } from "../../monthlySummary/base/MonthlySummaryFindManyArgs";
import { MonthlySummary } from "../../monthlySummary/base/MonthlySummary";
import { MonthlySummaryWhereUniqueInput } from "../../monthlySummary/base/MonthlySummaryWhereUniqueInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class HostelControllerBase {
  constructor(
    protected readonly service: HostelService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Hostel })
  @nestAccessControl.UseRoles({
    resource: "Hostel",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createHostel(@common.Body() data: HostelCreateInput): Promise<Hostel> {
    return await this.service.createHostel({
      data: {
        ...data,

        admin: {
          connect: data.admin,
        },
      },
      select: {
        address: true,

        admin: {
          select: {
            id: true,
          },
        },

        chefFee: true,
        createdAt: true,
        electricityBill: true,
        firstEntryFee: true,
        guestAllowed: true,
        guestMealAllowed: true,
        id: true,
        location: true,
        manager: true,
        maxGuestMeal: true,
        name: true,
        numberOfSits: true,
        otherFees: true,
        period: true,
        totalEntryFee: true,
        updatedAt: true,
        waterBill: true,
        wifiBill: true,
        wifiEntryFee: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [Hostel] })
  @ApiNestedQuery(HostelFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Hostel",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async hostels(@common.Req() request: Request): Promise<Hostel[]> {
    const args = plainToClass(HostelFindManyArgs, request.query);
    return this.service.hostels({
      ...args,
      select: {
        address: true,

        admin: {
          select: {
            id: true,
          },
        },

        chefFee: true,
        createdAt: true,
        electricityBill: true,
        firstEntryFee: true,
        guestAllowed: true,
        guestMealAllowed: true,
        id: true,
        location: true,
        manager: true,
        maxGuestMeal: true,
        name: true,
        numberOfSits: true,
        otherFees: true,
        period: true,
        totalEntryFee: true,
        updatedAt: true,
        waterBill: true,
        wifiBill: true,
        wifiEntryFee: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Hostel })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Hostel",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async hostel(
    @common.Param() params: HostelWhereUniqueInput
  ): Promise<Hostel | null> {
    const result = await this.service.hostel({
      where: params,
      select: {
        address: true,

        admin: {
          select: {
            id: true,
          },
        },

        chefFee: true,
        createdAt: true,
        electricityBill: true,
        firstEntryFee: true,
        guestAllowed: true,
        guestMealAllowed: true,
        id: true,
        location: true,
        manager: true,
        maxGuestMeal: true,
        name: true,
        numberOfSits: true,
        otherFees: true,
        period: true,
        totalEntryFee: true,
        updatedAt: true,
        waterBill: true,
        wifiBill: true,
        wifiEntryFee: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Hostel })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Hostel",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateHostel(
    @common.Param() params: HostelWhereUniqueInput,
    @common.Body() data: HostelUpdateInput
  ): Promise<Hostel | null> {
    try {
      return await this.service.updateHostel({
        where: params,
        data: {
          ...data,

          admin: {
            connect: data.admin,
          },
        },
        select: {
          address: true,

          admin: {
            select: {
              id: true,
            },
          },

          chefFee: true,
          createdAt: true,
          electricityBill: true,
          firstEntryFee: true,
          guestAllowed: true,
          guestMealAllowed: true,
          id: true,
          location: true,
          manager: true,
          maxGuestMeal: true,
          name: true,
          numberOfSits: true,
          otherFees: true,
          period: true,
          totalEntryFee: true,
          updatedAt: true,
          waterBill: true,
          wifiBill: true,
          wifiEntryFee: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: Hostel })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Hostel",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteHostel(
    @common.Param() params: HostelWhereUniqueInput
  ): Promise<Hostel | null> {
    try {
      return await this.service.deleteHostel({
        where: params,
        select: {
          address: true,

          admin: {
            select: {
              id: true,
            },
          },

          chefFee: true,
          createdAt: true,
          electricityBill: true,
          firstEntryFee: true,
          guestAllowed: true,
          guestMealAllowed: true,
          id: true,
          location: true,
          manager: true,
          maxGuestMeal: true,
          name: true,
          numberOfSits: true,
          otherFees: true,
          period: true,
          totalEntryFee: true,
          updatedAt: true,
          waterBill: true,
          wifiBill: true,
          wifiEntryFee: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/monthlySummaries")
  @ApiNestedQuery(MonthlySummaryFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "MonthlySummary",
    action: "read",
    possession: "any",
  })
  async findMonthlySummaries(
    @common.Req() request: Request,
    @common.Param() params: HostelWhereUniqueInput
  ): Promise<MonthlySummary[]> {
    const query = plainToClass(MonthlySummaryFindManyArgs, request.query);
    const results = await this.service.findMonthlySummaries(params.id, {
      ...query,
      select: {
        chefFee: true,
        createdAt: true,

        hostel: {
          select: {
            id: true,
          },
        },

        id: true,
        updatedAt: true,
      },
    });
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/monthlySummaries")
  @nestAccessControl.UseRoles({
    resource: "Hostel",
    action: "update",
    possession: "any",
  })
  async connectMonthlySummaries(
    @common.Param() params: HostelWhereUniqueInput,
    @common.Body() body: MonthlySummaryWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      monthlySummaries: {
        connect: body,
      },
    };
    await this.service.updateHostel({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/monthlySummaries")
  @nestAccessControl.UseRoles({
    resource: "Hostel",
    action: "update",
    possession: "any",
  })
  async updateMonthlySummaries(
    @common.Param() params: HostelWhereUniqueInput,
    @common.Body() body: MonthlySummaryWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      monthlySummaries: {
        set: body,
      },
    };
    await this.service.updateHostel({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/monthlySummaries")
  @nestAccessControl.UseRoles({
    resource: "Hostel",
    action: "update",
    possession: "any",
  })
  async disconnectMonthlySummaries(
    @common.Param() params: HostelWhereUniqueInput,
    @common.Body() body: MonthlySummaryWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      monthlySummaries: {
        disconnect: body,
      },
    };
    await this.service.updateHostel({
      where: params,
      data,
      select: { id: true },
    });
  }
}