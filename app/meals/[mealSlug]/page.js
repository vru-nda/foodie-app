import {getMeal} from '@/lib/meals';
import Image from 'next/image';

import classes from './page.module.css';

import React from 'react';
import {notFound} from 'next/navigation';

const MealDetailsPage = ({params}) => {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  const instructions = meal.instructions.replace(/\n/g, '<br/>');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={`https://post-manager.s3.eu-north-1.amazonaws.com/${meal.image}`}
            alt='food image'
            fill
            priority
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: instructions,
          }}
        ></p>
      </main>
    </>
  );
};

export default MealDetailsPage;
