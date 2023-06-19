interface InputProps {
  text: string;
  name: string;
  handleOnChange: (e:any) => void
  value?: string;
  options: string[];
}

export function Select({
  text,
  name,
  value,
  options,
  handleOnChange,
}: InputProps) {

  return (
    <div className='flex flex-col mb-4'>
      <label htmlFor={name} className='mb-1 font-bold text-sm'>{text}: </label>
      <select
        id={name}
        name={name}
        onChange={handleOnChange}
        value={value || ""}
        className='p-2 border border-gray-300 rounded'
      >
        <option>Selecione o sexo</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
