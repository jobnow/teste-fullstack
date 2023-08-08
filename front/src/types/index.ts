export interface User {
  id: number
  name: string
  email: string
}

export interface Post {
  id: number
  title: string
  description: string
  imageUrl?: string
  views: number
  likes: number
  dislikes: number
  comments: Comment[]
  user: User
  likedByUsers: User[]
  dislikedByUsers: User[]
}

export interface Comment {
  id: number
  description: string
  user: User
}
