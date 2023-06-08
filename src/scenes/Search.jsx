import React, {createContext, useEffect, useState} from 'react'
import SearchBox from '../components/SearchBox'

export const SearchContext = createContext(null)

const Search = ({onSubmit, values}) => {
    const [contextValue, setContextValue] = useState(null)

    const hydrateContextValue = () => {
        setContextValue(values)
    }

    useEffect(() => {
        hydrateContextValue()
    }, [])

    return (
        <SearchContext.Provider value={{contextValue, hydrateContextValue}}>
            {contextValue && (
                <SearchBox
                    onSubmit={onSubmit}
                    values={contextValue}
                />
            )}
        </SearchContext.Provider>
    )
}

export default Search
