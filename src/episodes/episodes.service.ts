import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Episode } from './episodes.model';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectModel('Episode') private readonly episodeModel: Model<Episode>,
  ) {}

  async createEpisode(
    name: string,
    description: string,
    author: string,
    minutes: string,
    image: string,
  ) {
    const newEpisode = new this.episodeModel({
      name,
      description,
      author,
      minutes,
      image,
    });

    const result = await newEpisode.save();
    return result;
  }

  async loadEpisodes() {
    const allEpisodes = await this.episodeModel.find({});
    return allEpisodes;
  }

  async oneEpisode(episodeId: string) {
    const episode = await this.episodeModel.findById(episodeId);
    return {
      id: episode.id,
      name: episode.name,
      description: episode.description,
      author: episode.author,
      minutes: episode.minutes,
    };
  }

  async updateEpisode(
    episodeId: string,
    name: string,
    image: string,
    author: string,
    description: string,
    minutes: string,
  ) {
    const updateEpisode = await this.findEpisode(episodeId);

    if (name) {
      updateEpisode.name = name;
    }

    if (description) {
      updateEpisode.description = description;
    }

    if(author) {
        updateEpisode.author = author;
    }

    if (image) {
      updateEpisode.image = image;
    }

    if (minutes) {
      updateEpisode.minutes = minutes;
    }

    updateEpisode.save();
  }

  async deleteEpisode(episodeId: string) {
    const result = await this.episodeModel.deleteOne({ _id: episodeId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find episode');
    }
  }

  private async findEpisode(episodeId: string): Promise<Episode> {
    let episode;

    try {
      episode = await await (
        await this.episodeModel.findById(episodeId)
      ).execPopulate();
    } catch (err) {
      throw new NotFoundException('Could not find episode');
    }

    if (!episode) {
      throw new NotFoundException('Could not find episode');
    }

    return episode;
  }
}
