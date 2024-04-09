import propTypes from "prop-types";

interface InputProps {
  lable: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
const Input = ({ lable, placeholder, onChange, type }: InputProps) => {
  return (
    <div className=" items-center justify-center">
      <label
        htmlFor={lable}
        className="block mb-2 text-sm  text-black font-bold pt-4"
      >
        {lable}
      </label>
      <input
        id={lable}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        onChange={onChange}
        type={type || "text"}
      />
    </div>
  );
};

Input.propTypes = {
  lable: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
};
export default Input;
