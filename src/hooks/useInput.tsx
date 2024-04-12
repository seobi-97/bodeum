import { useState, useCallback } from "react";

interface InputState {
  [name: string]: string | number;
}
function useInput(initialInput: InputState) {
  const [input, setInput] = useState<InputState>(initialInput);
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput(prevInput => ({ ...prevInput, [name]: value }));
  }, []);
  const reset = useCallback(() => setInput(initialInput), [initialInput]);
  return [input, onChange, reset];
}
export default useInput;
