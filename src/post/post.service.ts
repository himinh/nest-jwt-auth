import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  getPosts() {
    return this.postModel.find().populate('author');
  }

  getPostById(postId: string) {
    return this.postModel.findById(postId);
  }

  createPost(postBody: PostDocument) {
    return this.postModel.create(postBody);
  }

  async updatePost(postId: string, postBody: PostDocument) {
    const postUpdated = await this.postModel.findByIdAndUpdate(
      postId,
      postBody,
      { new: true, overwrite: true },
    );
    if (!postUpdated) throw new NotFoundException('Not found post');
    return postUpdated;
  }

  async deletePost(postId: string) {
    const post = await this.postModel.findByIdAndDelete(postId);
    if (!post) throw new NotFoundException('Not found post');
    return post;
  }
}
