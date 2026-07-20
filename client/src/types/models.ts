type UserBase = {
  id: string,
  name: string,
  age: number,
  email: string,
  updatedAt: Date,
  createdAt: Date
}

type UserStatistics = {
  id: number | null,
  userId: number,
  time: string,
  wpm: number,
  cpm: number,
  updatedAt: Date,
  createdAt: Date
}

export type { UserBase, UserStatistics }