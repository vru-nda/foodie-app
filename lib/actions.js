'use server';

import {redirect} from 'next/navigation';
import {revalidatePath} from 'next/cache';
import {saveMeal} from './meals';

export const isInvalidInput = (text) => {
  return !text || text.trim() === '';
};

export const shareMeal = async (prevState, formData) => {
  const meal = {
    creator: formData.get('name'),
    creator_email: formData.get('email'),
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
  };

  if (
    isInvalidInput(meal.title) ||
    isInvalidInput(meal.summary) ||
    isInvalidInput(meal.instructions) ||
    isInvalidInput(meal.creator) ||
    isInvalidInput(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: 'Invalid input',
    };
  }
  await saveMeal(meal);
  // revalidatePath('/meals', 'layout');
  revalidatePath('/meals');
  redirect('/meals');
};
