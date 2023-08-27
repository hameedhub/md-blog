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

    const newPost = await posts.select(["*"], [`id= ${result}`]);
    return newPost[0];
  }
  static async index(): Promise<Post[]> {
    return await posts.selectAll();
  }
  static async show(postId: number): Promise<Post> {
    const post = await posts.select(["*"], [`id=${postId}`]);
    if (post.length === 0) throw new Error("Post not found");
    return post;
  }
}
