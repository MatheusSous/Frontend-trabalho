interface SubmitProps {
  value: string;
  disabled?: boolean;
}
export function Submit({ value, disabled=false }: SubmitProps) {
  return (
    <input
      type="submit"
      value={value}
      disabled={disabled}
      className="flex justify-center items-center text-white bg-[#25b456] rounded-md min-w-[100px] min-h-[2.5rem] w-full cursor-pointer text-xl font-semibold hover:bg-[#178a3f]"
    />
  );
}
