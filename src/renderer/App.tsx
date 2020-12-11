import React from 'react'
import styled from 'styled-components'

const AppStyle = styled.div`
    width: 100%;
    height: 100%;
    color: #ffffff;
    background-color: #282c34;
`

const App: React.FC = () => {
    return (
        <AppStyle>
            <span>Hello World</span>
        </AppStyle>
    )
}

export default App
