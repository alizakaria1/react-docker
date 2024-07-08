import { UploadedFiles } from "./index";

export default class Product {
  id!: number;
  name!: string;
  description!: string;
  price!: number;
  rating!: number;
  ratingCount!: number;
  uploadedFiles?: UploadedFiles[];
}
