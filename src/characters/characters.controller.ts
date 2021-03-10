import { Controller, Get, Post, Body, Res, Param, Patch, Delete } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { Response } from 'express';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}
  
  @Get()
  async allCharacters(@Res() response: Response) {
    const characters = await this.charactersService.loadCharacters();
    return response.json({
      message: 'All Family guy characters',
      characters
    })
  }

  @Post()
  async addCharacter(@Body('name') characterName: string, @Body('description') characterDescription: string, @Body('image') characterImage: string, @Res() response: Response) {
    const newCharacter = await this.charactersService.createCharacter(characterName, characterDescription, characterImage);
    return response.json({
      message: 'New character was edit',
      newCharacter
    })
  }

  @Get('/:id')
  singleCharacter(@Param('id') characterId: string) {
    return this.charactersService.oneCharacter(characterId);
  }

  @Patch('/:id')
  async updateCharacter(@Res() response: Response, @Param('id') characterId: string, @Body('name') characterName: string, @Body('description') characterDescription: string, @Body('image') characterImage: string) {
    const updateCharacter = await this.charactersService.updateCharacter(characterId,  characterName, characterDescription, characterImage);

    return response.json({
      message: 'Character was updated',
      updateCharacter
    })
  }

  @Delete('/:id')
  async deleteCharacter(@Param('id') characterId: string) {
    return this.charactersService.deleteCharacter(characterId);
  }
}