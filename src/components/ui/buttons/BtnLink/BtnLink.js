function BtnLink({ text, classNames, href }) {
  const classList = classNames ? ['btn btn-link', ...classNames].join(' ') : 'btn btn-link';

  return (
    <a href={href ?? '#'}
      target='_blank'
      rel='noreferrer'
      className={classList}
    >{text}</a>
  );
}

export default BtnLink;
