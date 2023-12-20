import { FC, useEffect, useState } from 'react';

import style from './CartItem.module.scss';
import { Tooltip } from '../Tooltip/Tooltip';
import { Checkbox } from '../../UI/Checkbox/Checkbox';

import { FaTrash, FaRegHeart, FaHeart } from 'react-icons/fa';
import { ICartItemProps } from './CartItemTypes';
import { useAppDispatch, useAppSelector } from '../../services/redux/store';
import {
  addToLocalStorage,
  addToUncheckedList,
  asyncAddToCart,
  asyncRemoveFromCart,
  removeCartPostion,
  removeFromLocalStorage,
  removeFromUncheckedList,
  updateCartItem,
} from '../../services/redux/slices/cart/cart';
import {
  useBuyerBasketAddItemMutation,
  useBuyerBasketDeleteItemMutation,
  useBuyerBasketDeletePositionMutation,
  useBuyerBasketInfoQuery,
} from '../../utils/api/buyerBasketApi';
import { useNavigate } from 'react-router-dom';
import {
  useBuyerAddFavoritesMutation,
  useBuyerDeleteFavoritesMutation,
  useBuyerFavoritesQuery,
} from '../../utils/api/buyerApi';
import {
  addToFavorites,
  ayncToggleFavorite,
  removeFromFavorites,
} from '../../services/redux/slices/favourites/favourites';
import { ICartItem } from '../ProductListCart/ProductListTypes';

export const CartItem: FC<ICartItemProps> = ({ item }) => {
  const userId = localStorage.getItem('userId');

  const product = item?.productResponseDto;

  const navigate = useNavigate();
  const [tooltipText, setTooltipText] = useState('');
  const [totalPrice, setTotalPrice] = useState(product?.price);
  const [quantity, setQuantity] = useState(item.quantity);
  const [buyerBasketAddItem, addItemError] = useBuyerBasketAddItemMutation();
  const [buyerBasketDeleteItem, removeItemError] =
    useBuyerBasketDeleteItemMutation();
  const [addFavorites] = useBuyerAddFavoritesMutation();
  const [deleteFavorites] = useBuyerDeleteFavoritesMutation();

  const buyerFavorites = useBuyerFavoritesQuery(undefined);

  const basketInfo = useBuyerBasketInfoQuery(undefined);
  const [buyerBasketСlearPosition] = useBuyerBasketDeletePositionMutation();

  const dispatch = useAppDispatch();

  const favorites = useAppSelector(state => state.favorite?.favorites);
  const isFavorite = favorites?.some(item => item === product.id);

  const isChecked = useAppSelector(
    state => state.cart.uncheckedItemIds.indexOf(item.id) === -1,
  );

  const handleToggleFavorite = async () => {
    const action = isFavorite ? deleteFavorites : addFavorites;
    await ayncToggleFavorite(action, product.id, buyerFavorites.refetch);
    dispatch(
      isFavorite ? removeFromFavorites(product.id) : addToFavorites(product.id),
    );
  };

  useEffect(() => {
    updateTotalPrice(item.installation, quantity);
    dispatch(
      updateCartItem({
        ...item,
      }),
    );
  }, [quantity, dispatch]);

  const updateTotalPrice = (
    wasInstallationSelected: boolean,
    updatedQuantity: number,
  ) => {
    const installationPrice = wasInstallationSelected
      ? product?.installationPrice
      : 0;
    setTotalPrice((product?.price + installationPrice) * updatedQuantity);
  };

  const handleBuyCheckboxChange = () => {
    if (!isChecked) {
      dispatch(removeFromUncheckedList(item.id));
    } else {
      dispatch(addToUncheckedList(item.id));
    }
  };

  const handleIncreaseQuantity = async () => {
    if (
      quantity < 10 &&
      product.quantity !== undefined &&
      quantity < product.quantity
    ) {
      if (userId) {
        await asyncAddToCart(
          product,
          buyerBasketAddItem,
          basketInfo.refetch,
          item.installation,
        );
      } else {
        addToLocalStorage(product, dispatch, item.installation);
      }

      setQuantity(quantity + 1);
      updateTotalPrice(item.installation, quantity + 1);
    }
  };

  const handleDecreaseQuantity = async () => {
    if (userId) {
      await asyncRemoveFromCart(
        product,
        buyerBasketDeleteItem,
        basketInfo.refetch,
        item.installation,
      );
    } else {
      removeFromLocalStorage(product.id, dispatch, item.installation);
    }

    if (quantity > 0) {
      setQuantity(quantity - 1);
    }

    updateTotalPrice(item.installation, quantity - 1);
  };

  const handleRemoveItem = async () => {
    if (userId) {
      await buyerBasketСlearPosition(item.id).unwrap();
      basketInfo.refetch();
    } else {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') ?? '[]');
      const updatedCartItems = cartItems.filter(
        (cartItem: ICartItem) => cartItem.id !== item.id,
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      dispatch(removeCartPostion(item.id));
    }
  };

  const linkToPage = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <li className={style.cartItem}>
      <Checkbox onCheck={handleBuyCheckboxChange} checked={isChecked} />

      <img
        src={product?.image}
        alt="Фотография товара"
        className={style.cartItem__img}
        onClick={linkToPage}
      />
      <div className={style.cartItem__info}>
        <p className={style.cartItem__name} onClick={linkToPage}>
          {product?.name}
        </p>
        <div className={style.cartItem__parameters}>
          <span className={style.cartItem__type}>Лицензия</span>
          <Checkbox checked={item.installation} readOnly />
          <span
            className={style.cartItem__installationText}
          >{`c установкой ${product?.installationPrice}`}</span>
          <div
            className={style.cartItem__question}
            onMouseEnter={() =>
              setTooltipText(
                'Наш специалист установит ПО на ваше устройство в удобное время',
              )
            }
            onMouseLeave={() => setTooltipText('')}
          >
            ?
          </div>
          {tooltipText && <Tooltip text={tooltipText} />}
        </div>
        <div className={style.cartItem__buttons}>
          {userId && (
            <button
              className={style.cartItem__like}
              type="button"
              onClick={handleToggleFavorite}
            >
              {isFavorite ? <FaHeart size={22} /> : <FaRegHeart size={22} />}
            </button>
          )}

          <FaTrash
            size={18}
            className={style.cartItem__trash}
            onClick={handleRemoveItem}
          />
        </div>
      </div>
      <span className={style.cartItem__price}>{totalPrice} ₽</span>
      <div className={style.cartItem__quantity}>
        <button
          onClick={handleDecreaseQuantity}
          className={style.cartItem__decreaseQuantity}
          disabled={removeItemError.isError}
        ></button>
        <span>{quantity}</span>
        <button
          onClick={handleIncreaseQuantity}
          className={style.cartItem__increaseQuantity}
          disabled={
            addItemError.isError ||
            quantity > 9 ||
            quantity === product.quantity
          }
        ></button>
      </div>
    </li>
  );
};
