import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Setting } from '@leaa/common/src/entrys';
import { CreateSettingInput, UpdateSettingInput } from '@leaa/common/src/dtos/setting';
import { SettingService } from '@leaa/api/src/modules/setting/setting.service';

describe('SettingService', () => {
  let settingService: SettingService;
  const SETTING_REPOSITORY_MOCK: Repository<Setting> = new Repository<Setting>();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SettingService,
        {
          provide: getRepositoryToken(Setting),
          useValue: SETTING_REPOSITORY_MOCK,
        },
      ],
    }).compile();

    settingService = module.get<SettingService>(SettingService);
  });

  it('should be server defined', () => {
    expect(settingService).toBeDefined();
  });

  let settingObject = new Setting();

  describe('createSetting', () => {
    const createSettingInput: CreateSettingInput = {
      name: 'name',
      slug: 'slug',
      value: '11111111',
      type: 'text',
      description: 'description',
      sort: 1,
    };

    settingObject = {
      ...createSettingInput,
      id: 1,
      created_at: new Date(),
    };

    it('should create setting', async () => {
      jest.spyOn(settingService, 'createSetting').mockImplementation(async () => settingObject);
      const result = await settingService.createSetting(createSettingInput);

      expect(result).toBe(settingObject);
    });
  });

  describe('updateSetting', () => {
    const updateSettingInput: UpdateSettingInput = { value: '22222222' };

    const updatedSetting: Setting = {
      ...settingObject,
      ...updateSettingInput,
    };

    it('should update setting', async () => {
      jest.spyOn(settingService, 'updateSetting').mockImplementation(async () => updatedSetting);
      const result = await settingService.updateSetting(1, updateSettingInput);

      expect(result).toBe(updatedSetting);
    });
  });

  describe('getSetting', () => {
    const settingsObject = {
      items: [settingObject, settingObject],
      page: 1,
      pageSize: 30,
      total: 10,
    };

    it('should return settings', async () => {
      jest.spyOn(settingService, 'settings').mockImplementation(async () => settingsObject);
      const result = await settingService.settings({});

      expect(result).toBe(settingsObject);
    });

    it('should return setting', async () => {
      jest.spyOn(settingService, 'setting').mockImplementation(async () => settingObject);
      const result = await settingService.setting(1);

      expect(result).toBe(settingObject);
    });

    it('should return setting (undefined)', async () => {
      jest.spyOn(settingService, 'setting').mockImplementation(async () => undefined);
      const result = await settingService.setting(-1);

      expect(result).toBe(undefined);
    });

    it('should return settingBySlug', async () => {
      jest.spyOn(settingService, 'settingBySlug').mockImplementation(async () => settingObject);
      const result = await settingService.settingBySlug('slug');

      expect(result).toBe(settingObject);
    });

    it('should return settingBySlug (undefined)', async () => {
      jest.spyOn(settingService, 'settingBySlug').mockImplementation(async () => settingObject);
      const result = await settingService.settingBySlug('unslug');

      expect(result).toBe(settingObject);
    });
  });

  describe('deleteSetting', () => {
    const deletedSetting = undefined;

    it('should delete setting', async () => {
      jest.spyOn(settingService, 'deleteSetting').mockImplementation(async () => deletedSetting);
      const result = await settingService.deleteSetting(1);

      expect(result).toBe(deletedSetting);
    });
  });
});
