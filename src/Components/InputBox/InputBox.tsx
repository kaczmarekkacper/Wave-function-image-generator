import React, { useEffect, useState } from "react";

type InputBoxProps = {
  label: string;
  type: string;
  setValue?: (value: number) => void;
  defaultValue?: number;
};

function InputBox(props: InputBoxProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!!props.defaultValue) setValue(props.defaultValue);
  }, [props.defaultValue]);

  function onChange(e: { target: { value: string } }) {
    const val = e.target.value;
    const valAsNumber = parseInt(val);
    setValue(valAsNumber);
    if (!!props.setValue) props.setValue(valAsNumber);
  }

  return (
    <>
      <label data-testid="label">{props.label}</label>
      <input
        data-testid="input"
        type={props.type}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default InputBox;
