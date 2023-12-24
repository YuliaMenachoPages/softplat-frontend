import { useEffect } from 'react';
import { useBuyerBasketInfoQuery } from '../../utils/api/buyerBasketApi';
import { clearCart, setCartItems } from '../redux/slices/cart/cart';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { ICartItem } from '../../components/ProductListCart/ProductListTypes';
import { popupState } from '../../UI/Popup/PopupSlice.tsx';
import { signOut } from '../redux/slices/user/user.ts';
import { clearFavorites } from '../redux/slices/favourites/favourites.tsx';
import { signout } from '../../components/SignOutPopup/SignOutPopupSlice.tsx';
import { useNavigate } from 'react-router-dom';
import { useAuthLogoutMutation } from '../../utils/api/authApi.tsx';

export const useLoadCart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId = localStorage.getItem('userId');
  const userStoreId = useAppSelector(store => store.user.user.id);

  const {data: basketInfo, error: basketError} = useBuyerBasketInfoQuery(undefined, {
    skip: !userId && !userStoreId,
  });

  const [ authLogout] = useAuthLogoutMutation();

  const handleSubmitLogout = () => {
    // @ts-ignore
    authLogout()
      .unwrap()
      .then((userData: any) => {
        dispatch(popupState(false));
        dispatch(signOut());

        dispatch(clearFavorites());
        dispatch(clearCart());

        console.log(userData);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
        localStorage.clear();
        navigate('/', { replace: true });
        dispatch(signout(true));
      });
  };

  // @ts-ignore
  if (basketError?.originalStatus === 401) {handleSubmitLogout()}


  useEffect(() => {
    if (basketInfo?.data) {
      basketInfo.refetch();
    // } else if (basketError?.originalStatus === 401) {
    //   console.log(basketError)
    //   handleSubmitLogout()
    }
  }, [userStoreId, basketInfo?.data]);

  const cartItems = JSON.parse(localStorage.getItem('cartItems') ?? '[]');

  useEffect(() => {
    if (userId) {
      if (basketInfo?.currentData) {
        dispatch(setCartItems(basketInfo.productsInBasket));
      }
    } else {
      dispatch(setCartItems(cartItems));
    }
  }, [basketInfo?.currentData, userId, dispatch]);
};

export const convertCartItemsToRequest = (): {
  installation: boolean;
  productId: number;
  quantity: number;
}[] => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') ?? '[]');

  let cartRequest: {
    installation: boolean;
    productId: number;
    quantity: number;
  }[] = [];

  cartItems.forEach((card: ICartItem) => {
    cartRequest.push({
      installation: card.installation,
      productId: card.productResponseDto.id,
      quantity: card.quantity,
    });
  });
  return cartRequest;
};
