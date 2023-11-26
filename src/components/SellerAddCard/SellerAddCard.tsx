import { FC } from 'react';
import { Input } from '../../UI/Input/Input';
import { InputTypes } from '../../UI/Input/InputTypes';
import {
  NAME_VALIDATION_CONFIG,
  LINK_VALIDATION_CONFIG,
  DESCRIPTION_VALIDATION_CONFIG,
  PRICE_VALIDATION_CONFIG,
  PRICE_INSTALL_VALIDATION_CONFIG,
} from '../../utils/constants';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from '../SellerAddCard/SellerAddCard.module.scss';
import { Button } from '../../UI/Button/Button';
import { ICreateProductFields } from '../SellerAddCard/SellerAddCardTypes';
import { SellerCategories } from '../SellerCategories/SellerCategories';

const SellerAddCard: FC<ICreateProductFields> = ({ inputType, error = '' }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICreateProductFields>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<ICreateProductFields> = data => {
    console.log(data);
    // reset();
  };

  return (
    <form className={styles.sellerAddCard} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.sellerAddCard__inputs}>
        <Input
          inputType={InputTypes.name}
          labelText="Введите название"
          validation={{
            ...register('name', NAME_VALIDATION_CONFIG),
          }}
          error={errors?.name?.message}
        />
        <span className={styles.input__error}>
          {error ? (
            error
          ) : inputType === 'name' ? (
            <p className={styles.sellerAddCard__label}>
              Полное название в соответствии лицензией
            </p>
          ) : (
            ''
          )}
        </span>
        <div>
          <p className={styles.sellerAddCard__title_first}>
            Выберите производителя
          </p>
          <select
            name="select-category"
            className={styles.sellerAddCard__select}
          >
            <option value="1"></option>
          </select>
        </div>
        <div>
          <p className={styles.sellerAddCard__title}>Выберите категорию</p>
          <select
            name="select-category"
            className={styles.sellerAddCard__select}
          >
            <option value="1"></option>
          </select>
        </div>
        <div>
          <p className={styles.sellerAddCard__title}>
            Выберите вариант программы
          </p>
          <select
            name="select-category"
            className={styles.sellerAddCard__select}
          >
            <option value="1"></option>
          </select>
        </div>
      </div>
      <div>
        <p className={styles.sellerAddCard__title}>Загрузите ПО</p>
        <label className={styles.sellerAddCard__load}>
          <input
            type="file"
            name="file"
            id="file"
            className={styles.sellerAddCard__loadImg}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 8L12 4M12 4L8 8M12 4L12 16"
              stroke="#545F71"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p>Перетащите сюда файлы или клините для выбора</p>
        </label>
      </div>
      <p className={styles.sellerAddCard__title}>
        или вы можете указать ссылку на файл для качивания
      </p>
      <Input
        inputType={InputTypes.link}
        validation={{
          ...register('link', LINK_VALIDATION_CONFIG),
        }}
        error={errors?.link?.message}
      />
      <div>
        <p className={styles.sellerAddCard__title}>Загрузите логотип ПО</p>
        <label className={styles.sellerAddCard__load_logo}>
          <input
            type="file"
            name="file"
            id="file"
            className={styles.sellerAddCard__loadImg}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="116"
            height="116"
            viewBox="0 0 116 116"
            fill="none"
          >
            <rect width="116" height="116" rx="11.6" fill="#EEF1F4" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M43.5012 37.6992H72.5012C74.0394 37.6992 75.5147 38.3109 76.6024 39.3997C77.6901 40.4886 78.3012 41.9653 78.3012 43.5051V72.5348C78.3012 74.0746 77.6901 75.5514 76.6024 76.6402C75.5147 77.729 74.0394 78.3407 72.5012 78.3407H43.5012C41.9629 78.3407 40.4877 77.729 39.4 76.6402C38.3122 75.5514 37.7012 74.0746 37.7012 72.5348V43.5051C37.7012 41.9653 38.3122 40.4886 39.4 39.3997C40.4877 38.3109 41.9629 37.6992 43.5012 37.6992Z"
              stroke="white"
              stroke-width="2.94328"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M78.3012 66.7297L69.6012 58.0208L60.9012 66.6861M72.5012 78.3415L46.4012 52.2148L37.7012 60.9237"
              stroke="white"
              stroke-width="2.94328"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M68.15 50.763C69.7516 50.763 71.05 49.4633 71.05 47.86C71.05 46.2567 69.7516 44.957 68.15 44.957C66.5484 44.957 65.25 46.2567 65.25 47.86C65.25 49.4633 66.5484 50.763 68.15 50.763Z"
              fill="white"
            />
          </svg>
        </label>
      </div>
      <p className={styles.sellerAddCard__title}>Добавьте описание</p>
      <Input
        inputType={InputTypes.description}
        validation={{
          ...register('description', DESCRIPTION_VALIDATION_CONFIG),
        }}
        error={errors?.description?.message}
      />
      <Input
        inputType={InputTypes.price}
        labelText="Введите стоимость"
        validation={{
          ...register('price', PRICE_VALIDATION_CONFIG),
        }}
        error={errors?.price?.message}
      />
      <Input
        inputType={InputTypes.priceInstall}
        labelText="Стоимость установки"
        validation={{
          ...register('priceInstall', PRICE_INSTALL_VALIDATION_CONFIG),
        }}
        error={errors?.priceInstall?.message}
      />
      <p className={styles.sellerAddCard__title}>
        Выберите ключевые слова для поиска
      </p>
      <SellerCategories />
      <div className={styles.sellerAddCard__btncontainer}>
        <Button isDisabled={!isValid} mode="primary">
          Сохранить
        </Button>
        <Button type="button" mode="secondary">
          Отправить на модерацию
        </Button>
      </div>
    </form>
  );
};

export default SellerAddCard;
