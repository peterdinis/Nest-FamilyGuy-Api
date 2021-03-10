import { Module } from '@nestjs/common';
import { EpisodesController } from './episodes.controller';
import { EpisodeService } from './episodes.service';
import {MongooseModule} from '@nestjs/mongoose';
import {EpisodeSchema} from './episodes.model';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Episode',
      schema: EpisodeSchema
    }])
  ],
  controllers: [EpisodesController],
  providers: [EpisodeService ],
})
export class EpisodesModule {}
