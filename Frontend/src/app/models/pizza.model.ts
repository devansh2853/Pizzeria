export interface Pizza {
  id: string;
  type: string;
  price: number;
  name: string;
  image: string;
  description: string;
  ingredients: {
    id: string;
    iname: string;
  }[];
  topping: {
    id: string;
    tname: string;
    price: number;
  }[];
}
