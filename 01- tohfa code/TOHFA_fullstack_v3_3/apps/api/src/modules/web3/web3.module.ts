import { Module } from '@nestjs/common';
import { Web3Controller } from './web3.controller';
import { NotifierModule } from '../notifier/notifier.module';
@Module({ imports: [NotifierModule], controllers: [Web3Controller] })
export class Web3Module {}
