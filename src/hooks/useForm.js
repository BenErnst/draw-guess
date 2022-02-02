
import { useState } from "react";

export const useForm = (initialState) => {
    const [fields, setFields] = useState(initialState);
    const handleChange = ({ target }) => setFields(target.value);
    return [fields, handleChange, setFields];
}
