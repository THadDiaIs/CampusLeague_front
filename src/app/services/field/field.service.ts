import { Field } from '../../types/field';
import { Get, Post } from '../api/api.generic';

export const getField = async (id: number): Promise<Field> => {
  const response = await Get<Field>(`/campo/${id}`, {}, true);
  return response.data;
};

export const updateField = async (id: number, fieldData: Field): Promise<Field> => {
  const response = await Post<Field>(`/campo/${id}`, fieldData, true);
  return response.data;
};

export const deleteField = async (id: number): Promise<Field> => {
  const response = await Post<Field>(`/campo/${id}`, {}, true);
  return response.data;
};

export const getAllFields = async (): Promise<Field[]> => {
  const response = await Get<Field[]>(`/campo`, {}, true);
  return response.data;
};
