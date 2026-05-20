import { Module } from '@nestjs/common';
import { IiifController } from './iiif.controller';
@Module({ controllers:[IiifController] })
export class IiifModule {}
