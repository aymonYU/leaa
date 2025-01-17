import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class PaginationObject {
  @Field(() => Int, { nullable: true })
  public readonly page!: number;

  @Field(() => Int)
  public readonly pageSize!: number;

  @Field(() => Int, { nullable: true })
  public readonly nextPage?: number | null;

  @Field(() => Int)
  public readonly itemsCount?: number;

  @Field(() => Int)
  public readonly total!: number;
}
