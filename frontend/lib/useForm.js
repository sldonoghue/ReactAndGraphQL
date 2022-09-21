import { useState } from "react";

export default function useForm(initial = []) {
  // Create a state object for our fields
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    let { value, name, type } = e.target;

    if (type === "number") {
      value = parseInt(value);
    }

    if (type === "file") {
      // Give us the first value for the e.target.files array
      [value] = e.target.files;
    }

    setInputs({
      // Copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  // resets each value in key pair to empty string - converting object to arrays and mapping over them and then converting back to object
  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ""])
    );
    setInputs(blankState);
  }
    
  
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm
  };
}