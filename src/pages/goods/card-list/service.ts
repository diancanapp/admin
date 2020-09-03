import request from '@/utils/request';
import { CategoryDataType } from './data.d';

export async function addCategory(params: CategoryDataType) {
  return request('/admin/category', {
    method: 'POST',
    data: params,
  });
}

export async function queryCategory(params: CategoryDataType) {
  return request('/api/categories', {
    method: 'POST',
    data: params,
  });
}