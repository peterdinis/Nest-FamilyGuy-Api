import { Injectable, Res } from '@nestjs/common';
import { Character } from './character.model';


@Injectable()
export class CharactersService {
  private characters: Character[] = [];

  newCharacter(
    name: string,
    description: string,
    image: string,
  ) {
    const newCharacter = new Character(
      name,
      description,
      image,
    );
    this.characters.push(newCharacter);
    return newCharacter;
  }

/* všetky veci z characters a pridáme to tu */
  loadCharacters() {
    return [...this.characters];
  }

  oneCharacter() {
    
  }

}
