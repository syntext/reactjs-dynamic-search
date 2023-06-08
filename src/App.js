import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeflex/primeflex.css'

import './App.css'
import Search from './scenes/Search'

function App() {

    const optionValues = {
        fixedSearchOptions: [
            {
                id: 'createdOn',
                description: 'Created On',
                type: 'daterange'
            },
        ],
        searchOptions: [
            {
                id: 'name',
                description: 'Name',
                type: 'text'
            },
            {
                id: 'country',
                description: 'Country',
                type: 'multiselect',
                options: [
                    {id: 'NL', label: 'Netherlands'},
                    {id: 'GB', label: 'United Kingdom'},
                    {id: 'TH', label: 'Thailand'},
                ]
            }
        ],
        sortOptions: [
            {
                id: 'createdOn',
                description: 'Created On',
                orders: ['desc', 'asc']
            },
            {
                id: 'updatedOn',
                description: 'Updated On',
                orders: ['desc']
            }
        ]
    }

    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <div className='App'>
            <Search onSubmit={onSubmit} values={optionValues}/>
        </div>
    )
}

export default App
