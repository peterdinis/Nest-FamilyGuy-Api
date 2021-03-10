import { Module } from '@nestjs/common';
import {CharactersModule} from './characters/characters.module';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [CharactersModule, MongooseModule.forRoot('mongodb://localhost:27017/CharactersDB')],
  controllers: [],
  providers: [],
})
export class AppModule {}
