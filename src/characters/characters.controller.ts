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
import { CharactersService } from './characters.service';
import { Response } from 'express';
import {ApiCreatedResponse, ApiHeader, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Character } from './character.def.model';

@ApiSecurity('basic')
@ApiTags('characters')
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  @ApiResponse({ 
    status: 200, 
    description: 'Loading all charaters from api',
    type: Character
  })
  async allCharacters(@Res() response: Response) {
    const characters = await this.charactersService.loadCharacters();
    return response.json({
      message: 'All Family guy characters',
      characters,
    });
  }

  @Post()
  @ApiCreatedResponse({
    status: 201,
    description:
      'Resposne if we created new Character: The Character was successfully created parameters are in the characters schema',
    type: Character
  })
  @ApiHeader({
    name: 'Character Header',
    description: 'This api only accepts json: Content-Type: "application/json" '
  })
  async addCharacter(
    @Body('name') characterName: string,
    @Body('description') characterDescription: string,
    @Body('image') characterImage: string,
    @Res() response: Response,
  ) {
    const newCharacter = await this.charactersService.createCharacter(
      characterName,
      characterDescription,
      characterImage,
    );
    return response.json({
      message: 'New character was edit',
      newCharacter,
    });
  }

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Get One Character' })
  singleCharacter(@Param('id') characterId: string) {
    return this.charactersService.oneCharacter(characterId);
  }

  @Patch('/:id')
  @ApiResponse({
    status: 200,
    description:
      'Response if we updated character: Character was successfully updated. Here we are update character by id. We can update one info or all character',
  })
  async updateCharacter(
    @Res() response: Response,
    @Param('id') characterId: string,
    @Body('name') characterName: string,
    @Body('description') characterDescription: string,
    @Body('image') characterImage: string,
  ) {
    const updateCharacter = await this.charactersService.updateCharacter(
      characterId,
      characterName,
      characterDescription,
      characterImage,
    );

    return response.json({
      message: 'Character was updated',
      updateCharacter,
    });
  }

  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Response if we deleted character: Character was deleted. Here we are deleted episode by id',
  })
  async deleteCharacter(@Param('id') characterId: string) {
    return this.charactersService.deleteCharacter(characterId);
  }
}
