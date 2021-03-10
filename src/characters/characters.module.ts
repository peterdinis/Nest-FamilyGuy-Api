import { Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import {MongooseModule} from '@nestjs/mongoose';
import {CharacterSchema} from './character.model';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Character',
      schema: CharacterSchema
    }])
  ],
  controllers: [CharactersController],
  providers: [CharactersService ],
})
export class CharactersModule {}
