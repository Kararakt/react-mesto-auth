export const AuthForm = ({
  name,
  onSubmit,
  children,
  textButton,
  disabled,
}) => {
  return (
    <form name={name} onSubmit={onSubmit} noValidate className="form">
      {children}
      <button
        type="submit"
        disabled={!disabled}
        className="form__submit-button form__submit-button_type_auth"
      >
        {textButton}
      </button>
    </form>
  );
};
