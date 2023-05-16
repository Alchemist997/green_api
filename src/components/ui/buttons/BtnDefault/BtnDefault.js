function BtnDefault({ children, action, disabled, classNames, title }) {
  const classList = classNames ? ['btn', ...classNames].join(' ') : 'btn';

  return (
    <button
      className={classList}
      onClick={action}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
}

export default BtnDefault;
