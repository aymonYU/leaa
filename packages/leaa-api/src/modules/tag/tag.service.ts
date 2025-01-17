import fs from 'fs';
import xss from 'xss';
import mkdirp from 'mkdirp';
import { Injectable } from '@nestjs/common';
import { Repository, FindOneOptions, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Tag, User } from '@leaa/common/src/entrys';
import {
  TagsArgs,
  TagsWithPaginationObject,
  TagArgs,
  CreateTagInput,
  UpdateTagInput,
  SyncTagsToFileObject,
} from '@leaa/common/src/dtos/tag';

import { formatUtil, curdUtil, paginationUtil, loggerUtil, permissionUtil } from '@leaa/api/src/utils';
import { dictConfig } from '@leaa/api/src/configs';

const CONSTRUCTOR_NAME = 'TagService';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private readonly tagRepository: Repository<Tag>) {}

  async tags(args: TagsArgs): Promise<TagsWithPaginationObject> {
    const nextArgs = formatUtil.formatArgs(args);

    if (nextArgs.q) {
      const qLike = Like(`%${nextArgs.q}%`);

      nextArgs.where = [{ name: qLike }];
    }

    const [items, total] = await this.tagRepository.findAndCount(nextArgs);

    return paginationUtil.calcPageInfo({ items, total, page: nextArgs.page, pageSize: nextArgs.pageSize });
  }

  async tag(id: number, args?: TagArgs & FindOneOptions<Tag>): Promise<Tag | undefined> {
    let nextArgs: FindOneOptions<Tag> = {};

    if (args) {
      nextArgs = args;
    }

    return this.tagRepository.findOne(id, nextArgs);
  }

  async tagByName(name: string, args?: TagArgs & FindOneOptions<Tag>): Promise<Tag | undefined> {
    const tag = await this.tagRepository.findOne({ where: { name } });

    if (!tag) {
      return undefined;
    }

    return this.tag(tag.id, args);
  }

  formatTag(str: string): string {
    if (str) {
      return xss.filterXSS(str.trim().replace(/\s/g, '-'));
    }

    return '';
  }

  async syncTagsToDictFile(): Promise<SyncTagsToFileObject> {
    if (!fs.existsSync(dictConfig.TAGS_DICT_PATH)) {
      loggerUtil.log(`syncTagsToDictFile, not exists ${dictConfig.DICT_DIR}`, CONSTRUCTOR_NAME);

      mkdirp(dictConfig.DICT_DIR, err =>
        loggerUtil.log(`syncTagsToDictFile, mkdirp ${dictConfig.DICT_DIR} ${JSON.stringify(err)}`, CONSTRUCTOR_NAME),
      );
    }

    const [items, total] = await this.tagRepository.findAndCount({ select: ['name'] });

    if (total) {
      fs.writeFileSync(dictConfig.TAGS_DICT_PATH, items.map(item => item.name).join('\n'));
    }

    loggerUtil.log(`syncTagsToDictFile, ${total} tags`, CONSTRUCTOR_NAME);

    return {
      status: `sync successful ${total} tags`,
    };
  }

  async createTag(args: CreateTagInput): Promise<Tag | undefined> {
    const tag = await this.tagByName(args.name);

    if (tag) {
      return tag;
    }

    const nextArgs = { ...args, name: this.formatTag(args.name) };

    return this.tagRepository.save({ ...nextArgs });
  }

  async createTags(tagNames: string[]): Promise<Tag[] | undefined> {
    let tags: Tag[] = [];
    const batchUpdatePromise: Promise<any>[] = [];

    await tagNames.forEach(tagName => {
      batchUpdatePromise.push(this.createTag({ name: tagName }));
    });

    await Promise.all(batchUpdatePromise)
      .then(data => {
        tags = data;
      })
      .catch(() => {
        loggerUtil.error(`createTags faild, args: ${JSON.stringify(tags)}`, CONSTRUCTOR_NAME);
      });

    return tags;
  }

  async updateTag(id: number, args: UpdateTagInput): Promise<Tag | undefined> {
    let nextArgs = args;

    if (args.name) {
      nextArgs = { ...args, name: this.formatTag(args.name) };
    }

    return curdUtil.commonUpdate(this.tagRepository, CONSTRUCTOR_NAME, id, nextArgs);
  }

  async deleteTag(id: number): Promise<Tag | undefined> {
    return curdUtil.commonDelete(this.tagRepository, CONSTRUCTOR_NAME, id);
  }
}
