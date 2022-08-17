import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Travel } from '../travel/entities/travel.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment)
    private commentsRepository : Repository<Comment>
  ){}

  async create(createCommentDto: CreateCommentDto, userId) {
    const comment = new Comment()
    comment.description = createCommentDto.description
    comment.travel = {id: createCommentDto.travel} as Travel
    comment.user = userId

    try {
      await this.commentsRepository.save(comment)
      return {message: 'Le commentaire a été créé'}
    } catch (error) {
      return {message: 'Aucun commentaire n\'a été créé'}
    }
  }

  async findAll() {
    return await this.commentsRepository.find({relations: ['travel', 'user']});
  }

  async findOne(id: string) {
    return await this.commentsRepository.find({where : {id}, relations: ['travel', 'user']});
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentsRepository.findOneBy({id: id})
    comment.description = updateCommentDto.description
    comment.editedAt = new Date()
    try {
      await this.commentsRepository.save(comment)
      return {message: 'Commentaire modifié'}
    } catch (error) {
      return {message: 'Commentaire non modifié'}
    }
  }

  async remove(id: string) {
    try {
      await this.commentsRepository.delete(id)
      return {message: 'Commentaire supprimé'}
    } catch (error) {
      return {message: 'Le commentaire n\'a pas été supprimé'}
    }
  }
}
