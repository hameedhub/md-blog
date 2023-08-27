import Post from "../models/post.model";
import Query from "../db/query";

const posts = new Query("posts");
const users = new Query("users");

export default class PostService {
  static async create(post: Post) {
    const checkUser = await users.select(["*"], [`id='${post.user_id}'`]);
    if (checkUser.length === 0) throw new Error(`The account not found`);

    const checkPost = await posts.select(
      ["*"],
      [`title='${post.title}' AND user_id=${post.user_id}`]
    );
    if (checkPost[0]) throw new Error(`Post title already exists`);

    const result: number = await posts.insert(Object.keys(post), [
      post.user_id,
      post.title,
      post.summary,
      post.content,
    ]);

    return PostService.show(result);
  }
  static async index(): Promise<Post[]> {
    return await posts.selectAll(
      [
        "posts.*",
        `CONCAT(users.first_name,' ', users.last_name) as author_name`,
      ],
      "posts.id",
      "DESC",
      20,
      "users",
      "posts.user_id = users.id",
      "LEFT"
    );
  }
  static async show(postId: number): Promise<Post> {
    const post = await posts.select(
      [
        "posts.*",
        `CONCAT(users.first_name,' ', users.last_name) as author_name`,
      ],
      [`posts.id=${postId}`],
      "users",
      "posts.user_id = users.id",
      "LEFT"
    );
    if (post.length === 0) throw new Error("Post not found");
    return post;
  }
  static async update(postId: number, post: Post) {
    const checkPost = await posts.select(["*"], [`id=${postId}`]);
    if (checkPost.length === 0) throw new Error("Post not found");

    const { created_at, updated_at, id, user_id, ...updatePost } = post;
    const result = await posts.update(updatePost, [`id=${postId}`]);

    if (result.affectedRows === 1) {
      return PostService.show(postId);
    }
    throw new Error("Unable to update post");
  }
  static async remove(postId: number, userId: number) {
    const checkPost = await posts.select(
      ["*"],
      [`id=${postId} AND user_id=${userId}`]
    );
    if (checkPost.length === 0)
      throw new Error("Post not found or not your post");

    const result = await posts.delete([`id=${postId}`]);
    if (result.affectedRows === 1) {
      return "Post deleted";
    }
    throw new Error("Unable to delete post");
  }
}
