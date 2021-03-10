import { Injectable, NotFoundException} from '@nestjs/common';
import {Model} from 'mongoose'
import {InjectModel} from '@nestjs/mongoose';
import {Character} from './character.model';

@Injectable()
export class CharactersService {
  constructor(@InjectModel('Character') private readonly characterModel: Model<Character>) {}

  async createCharacter(name: string, description: string, image: string) {
    const newCharacter = new this.characterModel({
        name,
        description,
        image
    })

    const result = await newCharacter.save();
    return result;
  }

  async loadCharacters() {
    const allCharacters = await this.characterModel.find({});
    return allCharacters;
  }

  async oneCharacter(characterId: string) {
    const character = await this.characterModel.findById(characterId);
    return {
      id: character.id,
      name: character.name,
      description: character.description,
      image: character.image
    }
  }

  async updateCharacter(characterId: string, name: string, image: string, description: string) {
    const updateCharacter = await this.findCharacter(characterId);

    if(name) {
      updateCharacter.name = name;
    }

    if (description) {
      updateCharacter.description = description;
    }

    if(image) {
      updateCharacter.image = image;
    }

    updateCharacter.save();
  }

  async deleteCharacter(characterId: string) {
    const result = await this.characterModel.deleteOne({_id: characterId}).exec();
    if(result.n === 0) {
      throw new NotFoundException('Could not find character');
    }
  }

  private async findCharacter(characterId: string): Promise<Character> {
    let character;

    try {
      character = await(await (await this.characterModel.findById(characterId)).execPopulate());
    } catch (err) {
      throw new NotFoundException('Could not find character');
    }

    if(!character) {
      throw new NotFoundException('Could not find character');
    }

    return character;
  }
}
