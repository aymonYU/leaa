import { IsOptional } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class UpdateArticleInput {
  @IsOptional()
  @Field(() => String)
  public title?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  public slug?: string;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  public user_id?: number;

  @IsOptional()
  @Field(() => String, { nullable: true })
  public description?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  public content?: string;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  public status?: number;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  public created_at?: Date;

  @IsOptional()
  @Field(() => [Int], { nullable: true })
  public categoryIds?: number[];

  @IsOptional()
  @Field(() => [Int], { nullable: true })
  public tagIds?: number[];
}
