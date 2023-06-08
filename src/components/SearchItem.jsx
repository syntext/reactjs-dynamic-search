import React, {useState} from "react";
import {InputText} from "primereact/inputtext";
import './SearchItem.css'
import {Button} from "primereact/button";
import {MultiSelect} from "primereact/multiselect";
import {Calendar} from "primereact/calendar";

const SearchItem = ({item, onRemove, onChange}) => {
    const [value, setValue] = useState()

    const handleValueChange = (e) => {
        setValue(e.value)
        onChange({
            uid: item.uid,
            id: item.id,
            value: e.target.value || e.value,
        })
    }

    const handleRemove = () => {
        setValue(undefined)
        onRemove(item)
        onChange({
            uid: item.uid,
            id: item.id,
            value: undefined,
        })
    }

    const renderItem = () => {
        switch (item.type) {
            case 'multiselect':
                return <MultiSelect
                    value={value}
                    options={item.options}
                    onChange={handleValueChange}
                    placeholder='Select item(s)'
                />
            case 'daterange':
                return <Calendar
                    value={value}
                    selectionMode='range'
                    onChange={handleValueChange}
                    placeholder='Select a range'
                />
            case 'text':
            default:
                return <InputText value={value} onChange={handleValueChange}/>
        }
    }

    return (
        <div className='p-grid'>
            <div className='p-col-2 p-col-align-center p-align-right'>
                {item.description}
            </div>
            <div className='p-col-9'>
                {renderItem()}
            </div>
            <div className='p-col-1'>
                {onRemove && (
                    <Button
                        icon='fa fa-remove'
                        onClick={handleRemove}
                        tabIndex={-1}
                    />
                )}
            </div>
        </div>
    )
}

export default SearchItem
