'use client';

import {useRef, useState} from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

const ImagePicker = ({label, name}) => {
  const imageInput = useRef();
  const [pickedImage, setPickedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage ? (
            <p>No image picked yet.</p>
          ) : (
            <Image src={pickedImage} alt='Picked image by the user' fill />
          )}
        </div>
        <input
          ref={imageInput}
          className={classes.input}
          type='file'
          name={name}
          id={name}
          accept='image/jpg, image/jpeg'
          onChange={handleImageChange}
          required
        />

        <button
          onClick={() => imageInput.current.click()}
          className={classes.button}
          type='button'
        >
          Pick an image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
