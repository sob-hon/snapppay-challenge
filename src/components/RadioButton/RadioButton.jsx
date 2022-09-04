import styles from './RadioButton.module.css';

const RadioButton = ({ id, value, checked, onChange, name, label }) => {
  return (
    <div>
      <input
        type="radio"
        id={id}
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
        className={styles.radioButtonInput}
      />
      <label
        className={`${styles.radioButtonLabel} ${
          checked ? styles.radioButtonLabelActive : ''
        }`}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export { RadioButton };
