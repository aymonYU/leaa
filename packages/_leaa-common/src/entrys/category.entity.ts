import { Index, Entity, Column } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

import { Base } from '@leaa/common/src/entrys';

@Entity('categories')
@Index('categories_name_unique', ['name'], { unique: true })
@Index('categories_slug_unique', ['slug'], { unique: true })
@ObjectType()
export class Category extends Base {
  @Column({ type: 'varchar', length: 32, unique: true })
  @Field(() => String)
  public name!: string;

  @Column({ type: 'varchar', length: 32, unique: true })
  @Field(() => String)
  public slug!: string;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int)
  public parent_id!: number;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  public description?: string;

  @Field(() => [Category], { nullable: true })
  public children?: Category[];

  @Field(() => String, { nullable: true })
  public key?: string;
}
