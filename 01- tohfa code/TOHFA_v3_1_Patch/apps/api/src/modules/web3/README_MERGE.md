Add to `web3.module.ts`:
--------------------------------
import { Module } from '@nestjs/common';
import { Web3Controller } from './web3.controller';
import { Web3Service } from './web3.service';
import { Web3MintController } from './web3.mint.controller';
import { Web3MintService } from './web3.mint.service';

@Module({ controllers:[Web3Controller, Web3MintController], providers:[Web3Service, Web3MintService] })
export class Web3Module {}
--------------------------------

Or replace your existing module with the above to include mint endpoints.
