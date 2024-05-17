import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRouting from './AdminRouting';

function Admin() {

    return (
        <div>
            <Routes>
                    <Route path="/dashboard/*" element={<AdminRouting />} />
            </Routes>
        </div>
    )
}

export default Admin
