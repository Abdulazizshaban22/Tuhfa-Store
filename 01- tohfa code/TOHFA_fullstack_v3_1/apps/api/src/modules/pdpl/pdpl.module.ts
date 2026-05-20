import { Module } from '@nestjs/common';
import { PdplController } from './pdpl.controller';
@Module({ controllers: [PdplController] })
export class PdplModule {}
