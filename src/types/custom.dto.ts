import {
  IsOptional,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
// declare namespace Express {
//   interface Request {
//     user?: { id: string; email: string }; // Example of a more specific user type
//   }
// }

export class createAddressDto {
  @MinLength(3)
  @MaxLength(100)
  @IsNotEmpty()
  readonly contact_name: string;

  @MaxLength(15)
  @MinLength(12)
  @IsNotEmpty()
  readonly mobile_no: string;

  @IsNotEmpty()
  readonly state: string;

  @IsNotEmpty()
  readonly lga: string;

  @IsNotEmpty()
  readonly country: string;

  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(3)
  readonly street: string;

  @IsNotEmpty()
  @MaxLength(9)
  @MinLength(5)
  readonly zip_code: string;

  @MaxLength(100)
  @MinLength(3)
  @IsOptional()
  readonly suite_no: string;

  @IsNotEmpty()
  readonly is_default: any;

  @IsOptional()
  readonly user: object;

  constructor(params: createAddressDto) {
    Object.assign(this, params);
  }
}
