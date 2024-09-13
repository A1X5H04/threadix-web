import axios from "axios";

export const GET = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
};

export const POST = async <T>(url: string, { arg }: { arg: T }) => {
  const res = await axios.post(url, arg);
  return res.data;
};

export const PUT = async <T>(url: string, { arg }: { arg: T }) => {
  const res = await axios.put(url, arg);
  return res.data;
};

export const DELETE = async (url: string) => {
  const res = await axios.delete(url);
  return res.data;
};
