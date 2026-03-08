import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.backdrop}>
      <div className={css.spinner}></div>
    </div>
  );
};