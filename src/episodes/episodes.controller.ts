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
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Episode } from './episodes.def.model';

@ApiSecurity('basic')
@ApiTags('episodes')
@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodeService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Loading all episodes from api',
    type: Episode,
  })
  async allEpisodes(@Res() response: Response) {
    const episodes = await this.episodesService.loadEpisodes();
    return response.json({
      message: 'All episodes',
      episodes,
    });
  }

  @Post()
  @ApiHeader({
    name: 'Episode Header',
    description: 'This api only accepts json: Content-Type: "application/json" '
  })
  @ApiCreatedResponse({
    status: 201,
    description:
      'Response if we created new Episode: The episode was successfully created parameters are in the episodes schema',
    type: Episode,
  })
  async addEpisode(
    @Res() response: Response,
    @Body('name') episodeName: string,
    @Body('description') episodeDescription: string,
    @Body('author') episodeAuthor: string,
    @Body('minutes') episodeMinutes: string,
  ) {
    const newEpisode = await this.episodesService.createEpisode(
      episodeName,
      episodeDescription,
      episodeMinutes,
      episodeAuthor,
    );

    return response.json({
      message: 'New Episode was edit',
      newEpisode,
    });
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Get Single episode',
  })
  singleEpisode(@Param('id') episodeId: string) {
    return this.episodesService.oneEpisode(episodeId);
  }

  @Patch('/:id')
  @ApiResponse({
    status: 200,
    description:
      'Response if we updated episode Episode was successfully updated. Here we are update episode by id. We can update one info or all episode',
    type: Episode,
  })
  async updateEpisode(
    @Res() response: Response,
    @Param('id') episodeId: string,
    @Body('name') episodeName: string,
    @Body('description') episodeDescription: string,
    @Body('minutes') episodeMinutes: string,
    @Body('author') episodeAuthor: string,
  ) {
    const updateEpisode = await this.episodesService.updateEpisode(
      episodeId,
      episodeName,
      episodeDescription,
      episodeMinutes,
      episodeAuthor,
    );

    return response.json({
      message: 'Episode was updated',
      updateEpisode,
    });
  }

  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Response if we deleted episode was successfully deleted. Here we are delete episode by id'
  })
  async deleteEpisode(@Param('id') episodeId: string) {
    return this.episodesService.deleteEpisode(episodeId);
  }
}
