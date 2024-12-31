import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePropertyDto {
  @IsNotEmpty({ message: 'Property address is missing' })
  discription: string;

  @IsNotEmpty({ message: 'Property address is missing' })
  address: string;

  @IsNotEmpty({ message: 'Property price is missing' })
  @IsNumber({}, { message: 'Price must be a valid number' })
  price: number;
}
