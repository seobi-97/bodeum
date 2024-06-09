export interface GetCommunity {
  answer: string;
  chatId: number;
  comment: string;
  dateTime: string;
  fluffyName: string;
  nickname: string;
  userId: number;
  imageURL: string;
}

export interface BoardPropsData {
  nickname: string;
  date: string;
  comment: string;
  answer: string;
  fluffy: number;
}
