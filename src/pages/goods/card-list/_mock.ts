// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';

let categories = [{
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

function getCategories(req: Request, res: Response) {
  const params = req.query;

  // @ts-ignore
  const count = params.count * 1 || 20;
  return res.json({
    success: true,
    data: categories
  });
}

function postCategory(req: Request, res: Response) {
  const { /* url = '', */ body } = req;
  // const params = getUrlParams(url);
  // const { method, id } = body;
  // const count = (params.count * 1) || 20;
  let result = categories || [];
  result.unshift({
    ...body,
    ID: result.length + 1,
    createdAt: new Date().getTime(),
  });
  // switch (method) {
  //   case 'delete':
  //     result = result.filter((item) => item.ID !== id);
  //     break;
  //   case 'update':
  //     result.forEach((item, i) => {
  //       if (item.ID === id) {
  //         result[i] = { ...item, ...body };
  //       }
  //     });
  //     break;
  //   case 'post':
  //     result.unshift({
  //       ...body,
  //       ID: `${result.length}`,
  //       createdAt: new Date().getTime(),
  //     });
  //     break;
  //   default:
  //     break;
  // }

  return res.json({
    success: true,
    data: result
  });
}


function modifyCategory(req: Request, res: Response) {
  const { /* url = '', */ body } = req;
  // const params = getUrlParams(url);
  const { ID } = body;
  // const count = (params.count * 1) || 20;
  let result = categories || [];
  result.forEach((item, i) => {
    if (item.ID === ID) {
      result[i] = { ...item, ...body };
    }
  });

  return res.json({
    success: true,
    data: result
  });
}

function deleteCategory(req: Request, res: Response) {
  const { /* url = '', */ body } = req;
  // const params = getUrlParams(url);
  const { ID } = body;
  // const count = (params.count * 1) || 20;
  let result = categories || [];
  result = result.filter((item) => item.ID !== ID);

  return res.json({
    success: true,
    data: result
  });
}

export default {
  'GET  /api/categories': getCategories,
  'POST  /admin/category': postCategory,
  'PUT  /admin/category': modifyCategory,
  'DELETE  /admin/category': deleteCategory,
};
