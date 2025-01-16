import { model, Schema } from "mongoose";
import { IProduct } from "./product.interface";

const productInfoSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: [true, "The title of the book is required."],
  },
  author: {
    type: String,
    required: [true, "The author of the book is required."],
  },
  price: {
    type: Number,
    required: [true, "The price of the book is required."],
  },
  category: {
    type: String,
    required: true,
    enum: {
      values: ["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"],
      message: "{VALUE} is not a valid category.",
    },
  },
  description: {
    type: String,
    default: "No description provided.",
  },
  quantity: {
    type: Number,
    default: 0,
  },
  inStock: {
    type: Boolean,
    required: [true, "Stock availability is required."],
  },
});

// creating hook pre and post

// productInfoSchema.pre('find', function(this, next){
//   this.find({inStock:  })
// })

const Product = model<IProduct>("Product", productInfoSchema);
export default Product;
