interface InputProps {
  type: string;
  text: string;
  name: string;
  placeholder?: string;
  handleOnChange: (e:any) => void
  value?: string;
  multiple?: any;
}

export function Input({
  type,
  text,
  name,
  placeholder,
  value,
  multiple,
  handleOnChange,
}: InputProps) {

  return (
    <div className='flex flex-col mb-4'>
      <label htmlFor={name} className='mb-1 font-bold text-sm'>{text}: </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        {...(multiple? {multiple}: '')}
        className='p-2 border border-gray-300 rounded'
      />
    </div>
  );
}
