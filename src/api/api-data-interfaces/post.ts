import { User } from './user';

export interface Post {
  _id: string;
  title: string;
  photo: string;
  likes: string[];
  postedBy: User;
  comments: {
    text: string;
    postedBy: User;
  }[];
}
