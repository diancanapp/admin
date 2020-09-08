import request from '@/utils/request';
import { CategoryDataType } from './data.d';

export async function addCategory(params: CategoryDataType) {
  return request('/admin/category', {
    method: 'POST',
    data: params,
  });
}

export async function queryCategory() {
  return request('/api/categories', {
    method: 'GET'
  });
}

export async function updateCategory(params: CategoryDataType) {
  return request('/admin/category', {
    method: 'PUT',
    data: params,
  });
}

export async function removeCategory(params: CategoryDataType) {
  return request('/admin/category', {
    method: 'DELETE',
    data: params,
  });
}