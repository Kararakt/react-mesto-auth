import { useClosePopupByEsc } from '../hooks/useClosePopupByEsc';

export const PopupWithForm = ({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  textButton,
  disabled = false,
}) => {
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
        <h2 className="popup__title">{title}</h2>
        <form name={name} onSubmit={onSubmit} noValidate className="form">
          {children}
          <button
            type="submit"
            disabled={disabled}
            className="form__submit-button"
          >
            {textButton}
          </button>
        </form>
      </div>
    </section>
  );
};
