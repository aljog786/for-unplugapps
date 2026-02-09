import { useState, useCallback } from 'react';

export function useForm<T>(initialState: T) {
  const [data, setData] = useState<T>(initialState);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'number' ? Number(value) : value;
    
    setData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  }, []);

  const updateField = useCallback((name: keyof T, value: T[keyof T]) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  return { data, setData, handleChange, updateField };
}
