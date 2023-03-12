import { Request, Response } from 'express';

import { getContent } from '@/server/helpers/api.helpers';
import { Section } from '@/entities/model/section.types';

const FILEPATH = 'src/data/sections.example.json';

export function getSections(_request: Request, response: Response) {
  getContent({
    filePath: FILEPATH,
    cb: (fileData) => {
      response.status(200).send(JSON.stringify({
        payload: fileData
      }));
    }
  });
}

export function getSection(request: Request, response: Response) {
  getContent({
    filePath: FILEPATH,
    cb: (fileData) => {
      const { sectionId } = request.params;

      const itemData = fileData.filter(
        (item: Section) => item.section_id.toString() === sectionId.toString()
      );

      response.status(200).send(JSON.stringify({
        payload: (itemData.length > 0)
          ? itemData[0]
          : {}
      }));
    }
  });
}