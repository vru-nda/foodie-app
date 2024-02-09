import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const s3 = new S3Client({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});
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

  const bufferedImage = await meal.image.arrayBuffer();

  const putObjectParams = {
    Bucket: 'post-manager',
    Key: filename,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  };

  await s3.send(new PutObjectCommand(putObjectParams));

  meal.image = filename;

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
