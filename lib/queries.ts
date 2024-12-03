import { AnyColumn, Placeholder, sql } from "drizzle-orm";

export const increment = (column: AnyColumn, value = 1) => {
  return sql`${column} + ${value}`;
};

export const decrement = (column: AnyColumn, value = 1) => {
  return sql`${column} - ${value}`;
};

export const containsInArray = (column: AnyColumn, value: string) => {
  return sql`${value} = ANY(${column})`;
};

export const notInArrayForArray = (column: AnyColumn, value: string[]) => {
  return sql`${column} && ${sql`ARRAY[${value
    .map((tag) => sql`${tag}`)
    .join(", ")}]`} = false`;
};
