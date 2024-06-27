import { http } from './request';

import { GetConsumeTypeList } from '@/types/api';

export const getConsumeTypeList: GetConsumeTypeList = () => {
  return http.get('/consumeTypeList');
};
