export const AuthForm = ({ name, onSubmit, children, textButton }) => {
  return (
    <form name={name} onSubmit={onSubmit} className="authentication__form">
      {children}
      <button type="submit" className="authentication__button">
        {textButton}
      </button>
    </form>
  );
};
