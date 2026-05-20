import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class ExhibitsService {
  list() { return prisma.exhibit.findMany(); }
  getByExternalId(id: string) { return prisma.exhibit.findUnique({ where: { externalId: id } }); }
}
