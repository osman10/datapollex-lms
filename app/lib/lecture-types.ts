export type Lecture = {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  category: string;
  price: number;
  thumbnailUrl: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
};
