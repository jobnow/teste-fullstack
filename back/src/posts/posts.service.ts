import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsService } from '@/comments/comments.service';
import { User } from '@/users/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private commentsService: CommentsService,
  ) {}

  relations = ['user', 'comments', 'likedByUsers', 'dislikedByUsers'];

  async create(userId: number, createPostDto: CreatePostDto) {
    return this.postsRepository.save({ ...createPostDto, userId });
  }

  findAll() {
    return this.postsRepository.find({ relations: this.relations });
  }

  findOne(id: number) {
    return this.postsRepository.findOne({
      where: { id },
      relations: this.relations,
    });
  }

  findByUser(userId: number) {
    return this.postsRepository.find({
      where: { userId },
      relations: this.relations,
    });
  }

  async generateReport(userId: number) {
    const posts = await this.findByUser(userId);
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      views: post.views,
      likes: post.likes,
      dislikes: post.dislikes,
      comments: post.comments.length,
    }));
  }

  async remove(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['comments'],
    });
    if (!post) throw new NotFoundException('Post not found');
    post.comments.forEach((comment) => {
      this.commentsService.remove(comment.id, 'post_owner');
    });
    return this.postsRepository.softDelete(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');

    if (
      post.title !== updatePostDto.title ||
      post.description !== updatePostDto.description ||
      post.imageUrl !== updatePostDto.imageUrl
    ) {
      if (!post.editHistory) {
        post.editHistory = [];
      }

      post.editHistory.push({
        content: JSON.stringify({
          title: post.title,
          description: post.description,
          imageUrl: post.imageUrl,
        }),
        editedAt: new Date(),
      });
    }

    return this.postsRepository.update(id, {
      ...updatePostDto,
      editHistory: post.editHistory,
    });
  }

  addView(id: number) {
    this.postsRepository
      .createQueryBuilder()
      .update(Post)
      .set({ views: () => 'views + 1' })
      .where('id = :id', { id })
      .execute();
  }

  async manageLike(postId: number, userId: number, add: boolean) {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ['likedByUsers', 'dislikedByUsers'],
    });
    if (!post) throw new NotFoundException('Post not found');

    if (add) {
      const userLikedPost = post.likedByUsers.some(
        (user) => user.id === userId,
      );
      if (userLikedPost) return null;

      const userDislikedPost = post.dislikedByUsers.some(
        (user) => user.id === userId,
      );
      if (userDislikedPost) {
        post.dislikedByUsers = post.dislikedByUsers.filter(
          (user) => user.id !== userId,
        );
        post.dislikes = post.dislikedByUsers.length;
      }

      const user = new User();
      user.id = userId;
      post.likedByUsers.push(user);
      post.likes = post.likedByUsers.length;
    } else {
      post.likedByUsers = post.likedByUsers.filter(
        (user) => user.id !== userId,
      );
      post.likes = post.likedByUsers.length;
    }

    await this.postsRepository.save(post);
    return post;
  }

  async manageDislike(postId: number, userId: number, add: boolean) {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ['dislikedByUsers', 'likedByUsers'],
    });
    if (!post) throw new NotFoundException('Post not found');

    if (add) {
      const userDislikedPost = post.dislikedByUsers.some(
        (user) => user.id === userId,
      );
      if (userDislikedPost) return null;

      const userLikedPost = post.likedByUsers.some(
        (user) => user.id === userId,
      );
      if (userLikedPost) {
        post.likedByUsers = post.likedByUsers.filter(
          (user) => user.id !== userId,
        );
        post.likes = post.likedByUsers.length;
      }

      const user = new User();
      user.id = userId;
      post.dislikedByUsers.push(user);
      post.dislikes = post.dislikedByUsers.length;
    } else {
      post.dislikedByUsers = post.dislikedByUsers.filter(
        (user) => user.id !== userId,
      );
      post.dislikes = post.dislikedByUsers.length;
    }

    await this.postsRepository.save(post);
    return post;
  }
}
