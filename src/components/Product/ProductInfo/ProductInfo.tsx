import { useState } from 'react';

import { Button } from '../../../UIStorybook/Button/Button.tsx';
import { Icons } from '../../../UIStorybook/Icons/Icons.tsx';

import styles from './ProductInfo.module.scss'
import { SliderOneCard } from '../../SliderOneCard/SliderOneCard.tsx';
import { slides } from '../../../utils/constants.ts';
import "swiper/css/navigation";

const fakeSeller = {
  id: '1',
  category: 'Категория',
  title: 'Название товара',
  vendor: 'Вендор',
  price: '1000',
  seller: 'Продавец',
  text: 'Описание товара',
}

// const fakeSlides = [
//   {
//   text: '1',
//   img: 'https://unsplash.com/photos/a-pink-and-blue-object-with-a-purple-background-qt5y_qKMQ3w',
//   link: 'violet'
// },
//   {
//     text: '2',
//     img: 'https://unsplash.com/photos/a-group-of-white-and-gold-tiles-on-a-white-surface-nPZ68nehUUo',
//     link: 'white'
//   },
//   {
//     text: '3',
//     img: 'https://unsplash.com/photos/a-watercolor-painting-of-a-sky-and-clouds-jR3gaeRa9Ck',
//     link: 'colors'
//   },
// ]

const ProductInfo = ({}) => {
  const [isLiked, setIsLiked] = useState(false)

  const handleClick = () => {
    setIsLiked(!isLiked)
  }

  return (
    <div className={styles.productInfo}>
<div className={styles.productInfo__slider}>
  <SliderOneCard slides={slides}/>
</div>
      <div className={styles.productInfo__description}>
<p>{fakeSeller.category}</p>
        <div className={styles.productInfo__name}>
          <h1>{fakeSeller.title}</h1>
          <h2>{fakeSeller.vendor}</h2>
          <p>{fakeSeller.id}</p>
        </div>
        <div className={styles.productInfo__priceInfo}>
          <h3>{fakeSeller.price} &#8381;</h3>
          <div>
            <p>{fakeSeller.seller}</p>
          </div>
          <Button buttonType='link'>Скачать демо</Button>
        </div>
        <p className={styles.productInfo__text}>{fakeSeller.text}</p>
        <div className={styles.productInfo__installation}>
          checkbox
        </div>
        <div className={styles.productInfo__buttons}>
          <Button buttonType='primary'>В корзину</Button>
          <Button buttonType='square' onClick={handleClick}>{isLiked ? <Icons type='filledLike' size={35}/> :
            <Icons type='emptyLike' size={35}/>}</Button>
      </div>
    </div>
    </div>
  );
};

export default ProductInfo;
