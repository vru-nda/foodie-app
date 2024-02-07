import sql from 'better-sqlite3';

const db = sql('meals.db');

export const getMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return db.prepare('SELECT * FROM meals').all();
};
