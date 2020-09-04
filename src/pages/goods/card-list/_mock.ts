// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';

function getCategories(req: Request, res: Response) {
  const params = req.query;

  // @ts-ignore
  const count = params.count * 1 || 20;
  return res.json({
    success: true,
    data: [{
      "ID":1,
      "CreatedAt":"2020-09-04T11:39:31+08:00",
      "UpdatedAt":"2020-09-04T11:39:31+08:00",
      "DeletedAt":null,
      "name":"家用电器",
      "categoryDesc":"家用电器",
      "sortOrder":100,
      "style":"",
      "categoryImg":"https://static.wozaizhao.com/xchao.png",
      "isShow":true,
      "isHot":false}]
  });
}

export default {
  'GET  /api/categories': getCategories,
};
