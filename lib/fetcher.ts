import axios from "axios";

export const GET = async <T>(url: string) => {
  const res = await axios.get<T>(url);
  return res.data;
};

export const POST = async <T>(url: string, { arg }: { arg: T }) => {
  const res = await axios.post(url, arg);
  return res.data;
};

export const PATCH = async <T>(url: string, { arg }: { arg: T }) => {
  const res = await axios.patch(url, arg);
  return res.data;
};

export const DELETE = async (url: string) => {
  const res = await axios.delete(url);
  return res.data;
};
