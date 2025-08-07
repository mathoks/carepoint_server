import { cart_item } from '@prisma/client';

export type Payload = {
  email: string;
  sub: string;
  exp?: string;
  image?: string;
};

export type ReviewSearchObject = {
  category_id: number;
  user_id: string;
  prod_id: string;
};

export type cartItemUpdateObject = {
  user_id: string;
  Quantity: number;
  CartItemID: string;
  variant_id?: string;
  ProductID?: string;
  TotalPrice: number;
  isVariant: boolean;
  stock_Quantity: number;
};

export type composedCartItemDataObject = {
  cartItemObjects: cart_item;
  userID: string;
};

export type ErrorMessage = string;

export type ErrorResponse = {
  message: ErrorMessage;
  operationName: string;
};
