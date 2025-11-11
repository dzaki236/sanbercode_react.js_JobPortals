import { useState } from "react";
const FormHooks = (init) => {
    const [value, setValue] = useState(init);
    const handleInput = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    };
    const resetInput = (newValue = init) => { setValue(newValue) };

    return { value, handleInput, resetInput };
}
export default FormHooks;
