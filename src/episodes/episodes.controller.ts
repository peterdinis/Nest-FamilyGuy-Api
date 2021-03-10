import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { EpisodeService } from './episodes.service';
import { Response } from 'express';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodeService) {}

  @Get()
  async allEpisodes(@Res() response: Response) {
    const episodes = await this.episodesService.loadEpisodes();
    return response.json({
      message: 'All episodes',
      episodes,
    });
  }

  @Post()
  async addEpisode(
    @Res() response: Response,
    @Body('name') episodeName: string,
    @Body('description') episodeDescription: string,
    @Body('author') episodeAuthor: string,
    @Body('minutes') episodeMinutes: string,
    @Body('image') episodeImage: string,
  ) {
    const newEpisode = await this.episodesService.createEpisode(
      episodeName,
      episodeDescription,
      episodeMinutes,
      episodeAuthor,
      episodeImage,
    );

    return response.json({
      message: 'New Episode was edit',
      newEpisode,
    });
  }

  @Get('/:id')
  singleEpisode(@Param('id') episodeId: string) {
    return this.episodesService.oneEpisode(episodeId);
  }

  @Patch('/:id')
  async updateEpisode(
    @Res() response: Response,
    @Param('id') episodeId: string,
    @Body('name') episodeName: string,
    @Body('description') episodeDescription: string,
    @Body('image') episodeImage: string,
    @Body('minutes') episodeMinutes: string,
    @Body('author') episodeAuthor: string,
  ) {
    const updateEpisode = await this.episodesService.updateEpisode(
      episodeId,
      episodeName,
      episodeDescription,
      episodeImage,
      episodeMinutes,
      episodeAuthor,
    );

    return response.json({
      message: 'Episode was updated',
      updateEpisode,
    });
  }

  @Delete('/:id')
  async deleteEpisode(@Param('id') episodeId: string) {
    return this.episodesService.deleteEpisode(episodeId);
  }
}
