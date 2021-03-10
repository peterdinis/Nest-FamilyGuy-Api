import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { Response } from 'express';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}
  @Post()
  addCharacter(
    @Res() res: Response,
    @Body('name') charName: string,
    @Body('description') charDescription: string,
    @Body('image') charImage: string,
  ) {
    this.charactersService.newCharacter(charName, charDescription, charImage);

    /* return res.json({
        message: 'New Character was edit to db',
        character
    }) */
  }

  @Get()
  getAllCharacters() {
        this.charactersService.loadCharacters();
        /* res response here */
  }

  @Get(':id')
  getOneCharacter() {
    
  }
}
