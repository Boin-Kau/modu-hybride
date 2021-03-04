import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const PageTransContext = createContext([{}, () => { }])

export const PageTransProvider = props => {
    const { children } = props
    const [pageTrans, setPageTrans] = useState('trans toRight')
    return <PageTransContext.Provider value={{ pageTrans, setPageTrans }}>{children}</PageTransContext.Provider>
}

PageTransProvider.propTypes = {
    children: PropTypes.node
}

export default { PageTransContext, PageTransProvider }