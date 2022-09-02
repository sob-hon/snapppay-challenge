function RadioButton({ id, value, checked, onChange, label }) {
  return (
    <div>
      <input
        type="radio"
        id={id}
        value={value}
        name="radio-group"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export { RadioButton }
