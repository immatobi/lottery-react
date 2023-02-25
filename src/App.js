import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const Home = React.lazy(() => import('./components/Home'))
const HomeComp = React.lazy(() => import('./components/HomeComp'))

const fallBack = () => {
  return(
    <>Loading...</>
  )
}

const App = () => {

  return (

    <Router>

      <Suspense fallback={fallBack()}>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/lottery' element={<HomeComp />} />
          <Route path='*' element={<Home />} />
        </Routes>

      </Suspense>

    </Router>

  )


}

export default App;
