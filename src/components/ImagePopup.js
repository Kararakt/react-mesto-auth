import { useClosePopupByEsc } from '../hooks/useClosePopupByEsc';

export const ImagePopup = ({ card, onClose }) => {
  useClosePopupByEsc(card, onClose);

  return (
    <section
      className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}
      onClick={onClose}
    >
      <div
        className="popup__image-container"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Закрытие окна"
          className="popup__close"
          onClick={onClose}
        ></button>
        <img
          src={card?.link}
          alt={`Фото ${card?.name}`}
          className="popup__image"
        />
        <h2 className="popup__caption">{card?.name}</h2>
      </div>
    </section>
  );
};
