/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  Hostel, // @ts-ignore
  MonthlySummary, // @ts-ignore
  User,
} from "@prisma/client";

export class HostelServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.HostelCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.HostelCountArgs>
  ): Promise<number> {
    return this.prisma.hostel.count(args);
  }

  async hostels<T extends Prisma.HostelFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.HostelFindManyArgs>
  ): Promise<Hostel[]> {
    return this.prisma.hostel.findMany(args);
  }
  async hostel<T extends Prisma.HostelFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.HostelFindUniqueArgs>
  ): Promise<Hostel | null> {
    return this.prisma.hostel.findUnique(args);
  }
  async createHostel<T extends Prisma.HostelCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.HostelCreateArgs>
  ): Promise<Hostel> {
    return this.prisma.hostel.create<T>(args);
  }
  async updateHostel<T extends Prisma.HostelUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.HostelUpdateArgs>
  ): Promise<Hostel> {
    return this.prisma.hostel.update<T>(args);
  }
  async deleteHostel<T extends Prisma.HostelDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.HostelDeleteArgs>
  ): Promise<Hostel> {
    return this.prisma.hostel.delete(args);
  }

  async findMonthlySummaries(
    parentId: string,
    args: Prisma.MonthlySummaryFindManyArgs
  ): Promise<MonthlySummary[]> {
    return this.prisma.hostel
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .monthlySummaries(args);
  }

  async getAdmin(parentId: string): Promise<User | null> {
    return this.prisma.hostel
      .findUnique({
        where: { id: parentId },
      })
      .admin();
  }
}