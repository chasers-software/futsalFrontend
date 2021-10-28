import React from 'react'
import Header from './pages/Header'
import Body from  './pages/Body'
import Footer from './pages/Footer'
import { CssBaseline } from '@mui/material'

const App = () => {
    return (
        <>
            <CssBaseline />
            <Header/>
            <Body />
            <Footer />
        </>
    )
}

export default App;