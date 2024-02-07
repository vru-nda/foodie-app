import sql from 'better-sqlite3';
import fs from 'node:fs';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export const getMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return db.prepare('SELECT * FROM meals').all();
};

export const getMeal = (slug) => {
  return db.prepare('SELECT * FROM meals WHERE slug= ?').get(slug);
};

export const saveMeal = async (meal) => {
  meal.slug = slugify(meal.title, {lower: true});
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const filename = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${filename}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (err) => {
    if (err) throw new Error('Saving image failed.');
  });

  meal.image = `/images/${filename}`;

  return db
    .prepare(
      ` INSERT INTO meals
        (title, summary, instructions, creator, creator_email, image, slug) 
        VALUES (
          @title,
          @summary,
          @instructions,
          @creator,
          @creator_email,
          @image,
          @slug
    )`
    )
    .run(meal);
};
