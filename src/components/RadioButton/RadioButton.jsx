function RadioButton({ id, value, checked, onChange, name, label }) {
  return (
    <div>
      <input
        type="radio"
        id={id}
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export { RadioButton };
