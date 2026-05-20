import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
@Injectable() export class ArtisansService {
  list(){ return prisma.artisan.findMany({ include: { products: true } }); }
  getByHandle(handle: string){ return prisma.artisan.findUnique({ where: { storeHandle: handle }, include: { products: true } }); }
}
