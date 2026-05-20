import { Module } from '@nestjs/common';
import { SplService } from './spl.service';
import { SplController } from './spl.controller';
@Module({ controllers:[SplController], providers:[SplService], exports:[SplService] })
export class SplModule {}
