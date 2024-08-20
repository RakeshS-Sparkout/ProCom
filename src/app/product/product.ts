export class Product {
    id: number;
    image: string;
    title: string;
    discount: string;
    rating: number;
    reviewsCount: number;
    price: number;
    quantity: number = 1;
    category: string;
    features: string[];
    reviews: {
      userId: string;
      username: string;
      comment: string;
      rating: number;
    }[];
  }
  