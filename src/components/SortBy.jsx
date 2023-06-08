import React, {useEffect, useState} from 'react'
import {Dropdown} from 'primereact/dropdown'

const SORT_DIRECTIONS = [
    {
        id: 'asc',
        description: 'Asc'
    },
    {
        id: 'desc',
        description: 'Desc'
    }
]

const DEFAULT_SORT_DIRECTION = SORT_DIRECTIONS[1]

const SortBy = ({options, onChange}) => {
    const [sortBy, setSortBy] = useState(options?.[0]?.id)
    const [sortDirection, setSortDirection] = useState(DEFAULT_SORT_DIRECTION.id)

    const [sortDirectionOptions, setSortDirectionOptions] = useState(SORT_DIRECTIONS)

    useEffect(() => {
        onChange({sortBy, sortDirection})
    }, [sortBy, sortDirection])

    useEffect(() => {
        const sortDirectionOption = options.find((o) => o.id === sortBy)
        const sortDirectionOptions = SORT_DIRECTIONS.filter((o) => sortDirectionOption.orders.includes(o.id))

        setSortDirectionOptions([...sortDirectionOptions])
        setSortDirection(sortDirectionOption.orders.includes(DEFAULT_SORT_DIRECTION.id)
            ? DEFAULT_SORT_DIRECTION.id : sortDirectionOption.orders[0])
    }, [sortBy])

    if (!options) return

    return (
        <div className='p-grid'>
            <div className='p-col-2 p-md-3 p-col-align-center p-align-right'>
                Sort By
            </div>
            <div className='p-col-6 p-md-5'>
                <Dropdown
                    onChange={(e) => setSortBy(e.value)}
                    value={sortBy}
                    options={options}
                    optionLabel='description'
                    optionValue='id'
                    placeholder='Select item'
                />
            </div>
            <div className='p-col-3 p-md-4'>
                <Dropdown
                    onChange={(e) => setSortDirection(e.value)}
                    value={sortDirection}
                    options={sortDirectionOptions}
                    optionLabel='description'
                    optionValue='id'
                />
            </div>
            <div className='p-sm-1 p-d-md-none'/>
        </div>
    )
}

export default SortBy
