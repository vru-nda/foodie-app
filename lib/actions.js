'use server';

import {redirect} from 'next/navigation';
import {saveMeal} from './meals';

export const shareMeal = async (formData) => {
  const meal = {
    creator: formData.get('name'),
    creator_email: formData.get('email'),
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
  };

  await saveMeal(meal);
  redirect('/meals');
};
