import fileUpload, { UploadedFile } from 'express-fileupload';
import { Controller } from '../lib/controller/Controller';
import { join } from 'path';
import { readdir, rm } from 'fs/promises';
import { ControllerRouteFunction } from '../lib/controller/ControllerRouteFunction';
import { IScheduleUploadJSONBody } from '../types/IScheduleUploadJSONBody';
import { BASE_SCHEDULES_PATH } from '../utils/constants';
import { SchedulesManager } from '../lib/schedules/SchedulesManager';
import { Util }from '../utils';

export class SchedulesController extends Controller {
  private _schedulesManager: SchedulesManager;

  public constructor() {
    super('/schedules');

    this._schedulesManager = new SchedulesManager();

    this.methods = [
      {
        path: '/teachers/list',
        method: 'GET',
        handler: this._handleListTeacherSchedules()
      },
      {
        path: '/teachers/:teacher',
        method: 'GET',
        handler: this._handleGetTeacher()
      },
      {
        path: '/teachers/delete/:teacher',
        method: 'DELETE',
        handler: this._handleDeleteSchedule()
      },
      {
        path: '/teachers/upload',
        method: 'POST',
        handler: [fileUpload(), this._handlePostSchedule()]
      }
    ];
  }

  private _handleGetTeacher(): ControllerRouteFunction {
    return async (req, res) => {
      const { teacher } = req.params;

      const hasSchedule = await this._schedulesManager.has(teacher);

      if(hasSchedule) {
        const data = await this._schedulesManager.getBySign(teacher);

        return res.status(200).sendFile(data.path);
      }

      res.status(400).json({ message: `Kan inte hitta schema för: "${teacher}"`});
    }
  }

  private _handleListTeacherSchedules(): ControllerRouteFunction {
    return async (req, res) => {
      try {
        const schedules = await this._schedulesManager.getAll(['full_name', 'sign']);

        res.status(200).json(schedules);
      } catch (err) {
        res.status(500).json({ err });
      }
    }
  }

  private _handleDeleteSchedule(): ControllerRouteFunction {
    return async (req, res) => {
      const { teacher } = req.params;

      if(this._hasScheduleFile(teacher)) {
        const path = join(BASE_SCHEDULES_PATH, `${teacher}.jpg`);

        try {
          await rm(path);

          if(this._schedulesManager.has(teacher)) {
            await this._schedulesManager.delete(teacher);
          }

          res.status(200).json({ message: 'Schedule deleted' });
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(400).json({ message: 'temp message' });
      }
    }
  }

  private _handlePostSchedule(): ControllerRouteFunction {
    return async (req, res) => {
      if(!req.files) {
        res.status(400).json({ message: 'Hittade inga filer' });
      } else {
        if(!req.body?.json) {
          return res.status(400).json({ message: 'Hittade ingen JSON data' });
        }

        try {
          const { full_name }: IScheduleUploadJSONBody = JSON.parse(req.body.json);
          const file = req.files.schedule as UploadedFile;

          if(!full_name) {
            return res.status(400).json({ message: 'Det måste finnas med ett "full_name" fält i din json' });
          }

          const sign = await Util.convertNameToSign(full_name);
          const hasScheduleFile = await this._hasScheduleFile(sign);
          const hasScheduleEntry = await this._schedulesManager.has(sign);

          const fileExt = file.name.split('.')[1];
          const filePath = join(BASE_SCHEDULES_PATH, `${sign}.${fileExt}`);

          if(!hasScheduleEntry) {
            await this._schedulesManager.create({ full_name, sign, path: filePath });
          }

          if(hasScheduleFile) {
            await rm(filePath);
          }

          file.mv(filePath);

          res.status(200).json({ message: 'Filer uppladdade', file });
        } catch (err) {
          res.status(500).json(err);
          console.error(err);
        }
      }
    }
  }

  private async _hasScheduleFile(sign: string): Promise<boolean> {
    const files = await readdir(BASE_SCHEDULES_PATH);

    for(const file of files) {
      if(file.split('.')[0] === sign) {
        return true;
      }
    }

    return false;
  }
}
