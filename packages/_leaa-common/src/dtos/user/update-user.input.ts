import { IsOptional, Length, MinLength, IsEmail, IsPhoneNumber } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class UpdateUserInput {
  @IsOptional()
  @IsPhoneNumber('CN')
  @Field(() => String, { nullable: true })
  phone?: string;

  @IsOptional()
  @IsEmail()
  @MinLength(6)
  @Field(() => String, { nullable: true })
  email?: string;

  @IsOptional()
  @Length(4, 64)
  @Field(() => String, { nullable: true })
  name?: string;

  @IsOptional()
  @Length(6, 64)
  @Field(() => String, { nullable: true })
  password?: string;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  status?: number;

  @IsOptional()
  @Field(() => [Int], { nullable: true })
  roleIds?: number[];

  @IsOptional()
  @Field(() => [String], { nullable: true })
  roleSlugs?: string[];
}
