type UserBase = {
  id: string,
  name: string,
  age: number,
  email: string,
  updatedAt: Date,
  createdAt: Date
}

type UserStatistics = {
  user_id: string,
  time: string,
  wpm: number,
  cpm: number,
  updatedAt: Date,
  createdAt: Date
}

export type { UserBase, UserStatistics }