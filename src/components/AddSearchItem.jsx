import React from "react";
import {Dropdown} from "primereact/dropdown";

const AddSearchItem = ({options, onAdd}) => {
    const onChange = (e) => {
        const item = options.find((obj) => obj.id === e.target.value)
        onAdd({...item, uid: generateRandomId(18)})
    }

    const generateRandomId = (length) =>
        Array.from({length}, () => Math.floor(Math.random() * 10)).join('');

    return (
        <Dropdown
            placeholder='Add search item'
            onChange={onChange}
            options={options}
            optionLabel='description'
            optionValue='id'
        />
    )
}

export default AddSearchItem
