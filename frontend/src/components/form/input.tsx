import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name?: string;
  placeholder?: string;
  errors?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <div className="w-full">
    <h3
      className={`block text-sm font-medium ${
        props.disabled ? "text-gray-500" : "text-gray-700"
        
      }`}
    >
      {props.label}
    </h3>
    <div className="relative mt-2">
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        ref={ref}
        className={`px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded-2xl text-sm border outline-none focus:outline-none w-full transition duration-200 ${props.errors ? 'border-danger' : 'border-gray-300 hover:border-gray-400 focus:border-primary'}`}
        {...props}
      />
    </div>
  </div>
));

Input.displayName = "Input";
export default Input;
