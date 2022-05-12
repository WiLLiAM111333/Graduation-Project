export interface IMenuResponse {
  feedbackAllowed: boolean;
  id: number;
  bulletins: Array<string>;
  weeks: Array<{
    days: Array<{ date: number }>;
    number: number;
    year: number;
  }>;
  school: {
    URLName: string;
    imageURL: string;
    id: number;
    district: {
      URLName: string;
      id: number;
      name: string;
      province: {
        URLName: string;
        id: number;
        name: string;
      }
    }
  }
}
