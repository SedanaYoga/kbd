import React from 'react'
import DashTable from '../Table/Table.component'

const DashLayout = ({children}) => {
    return (
        <div>
            <DashTable/>
            {children}
        </div>
    )
}

export default DashLayout