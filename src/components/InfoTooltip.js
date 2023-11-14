import confirm from '../images/confirm-register.svg';
import error from '../images/error-register.svg';

import { useClosePopupByEsc } from '../hooks/useClosePopupByEsc';

export const InfoTooltip = ({ name, isOpen, onClose, message }) => {
  useClosePopupByEsc(isOpen, onClose);

  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
      onClick={onClose}
    >
      <div
        className="popup__container"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Закрытие окна"
          className="popup__close"
          onClick={onClose}
        ></button>
        <img
          src={message ? confirm : error}
          alt="Фото состояния входа"
          className="popup__image_type_tooltip"
        />
        <h2 className="popup__title popup__title_type_tooltip">
          {message
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </section>
  );
};
