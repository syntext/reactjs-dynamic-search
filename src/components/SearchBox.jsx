import './SearchBox.css'
import React, {useState} from 'react'
import SearchItem from './SearchItem'
import {Panel} from 'primereact/panel'
import AddSearchItem from './AddSearchItem'
import SortBy from './SortBy'
import {Button} from 'primereact/button'
import Cookies from 'js-cookie'

const COLLAPSE_COOKIE_KEY = 'search-box-collapsed'

const SearchBox = ({onSubmit, values}) => {
    const [searchItems, setSearchItems] = useState([])
    const [itemValues, setItemValues] = useState([])
    const [sortValues, setSortValues] = useState({})

    const optionValues = {fixedSearchOptions: [], searchOptions: [], sortOptions: [], ...values}

    // Used to re-render component on form reset
    const [sessionId, setSessionId] = useState(0)

    const addItem = (item) => {
        setSearchItems([...searchItems, item])
    }

    const removeItem = (item) => {
        const filtered = searchItems.filter((_item) => _item.uid !== item.uid)
        setSearchItems(filtered)
    }

    const handleSortValuesChange = (values) => {
        setSortValues({...values})
    }

    const handleItemValueChange = (item) => {
        if (item.value === undefined) {
            // Remove item from the array
            const idx = itemValues.findIndex(_item => _item.uid === item.uid)
            if (idx !== -1) {
                itemValues.splice(idx, 1)
                setItemValues([...itemValues])
            }
        } else {
            // Update or add item to the array
            const idx = itemValues.findIndex(_item => _item.uid === item.uid)
            idx !== -1 ? (itemValues[idx] = item) : itemValues.push(item)
            setItemValues([...itemValues])
        }
    }

    const consolidateValuesById = () => {
        const consolidatedObj = {}

        itemValues.forEach(_item => {
            const {id, value} = _item
            if (consolidatedObj[id]) {
                consolidatedObj[id].push(value)
            } else {
                consolidatedObj[id] = [value]
            }
        })

        return consolidatedObj
    }

    const resetForm = () => {
        setSearchItems([])
        setItemValues([])
        setSessionId(Math.random())
    }

    const submitForm = () => {
        if (itemValues && Object.keys(itemValues).length > 0) {
            const consolidatedValues = consolidateValuesById(itemValues)
            onSubmit({...consolidatedValues, ...sortValues})
        }
    }

    const isCollapsed = () => Cookies.get(COLLAPSE_COOKIE_KEY) === 'true'

    const toggleCollapse = () => Cookies.set(COLLAPSE_COOKIE_KEY, !isCollapsed())

    return (
        <div className='search-box' key={sessionId}>
            <Panel header='Search' toggleable collapsed={isCollapsed()} onCollapse={toggleCollapse} onExpand={toggleCollapse}>
                <div className='p-grid p-p-4'>
                    <div className='p-order-1 p-order-md-0 p-col-12 p-md-8'>
                        {optionValues.fixedSearchOptions && optionValues.fixedSearchOptions.map((item) => (
                            <SearchItem
                                key={item.id}
                                item={item}
                                onChange={handleItemValueChange}
                            />
                        ))}
                        {searchItems && searchItems.map((item) => (
                            <SearchItem
                                key={item.uid}
                                item={item}
                                onRemove={removeItem}
                                onChange={handleItemValueChange}
                            />
                        ))}
                        <div className='p-grid'>
                            <div className='p-col-2'/>
                            <div className='p-col-9'>
                                <AddSearchItem
                                    options={optionValues.searchOptions}
                                    onAdd={addItem}
                                />
                            </div>
                            <div className='p-col-1'/>
                        </div>
                        <div className='p-grid'>
                            <div className='p-col-2'/>
                            <div className='p-col-10'>
                                <Button
                                    icon='fa fa-magnifying-glass'
                                    label='Search'
                                    onClick={submitForm}
                                />
                                <Button
                                    icon='fa fa-circle-xmark'
                                    label='Reset'
                                    className='p-ml-2'
                                    onClick={resetForm}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='p-order-0 p-order-md-1 p-col-12 p-md-4'>
                        <SortBy
                            options={optionValues.sortOptions}
                            onChange={handleSortValuesChange}
                        />
                    </div>
                </div>
            </Panel>
        </div>
    )
}

export default SearchBox
