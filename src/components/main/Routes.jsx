import React from "react";
import {Route, Routes} from "react-router";

import Home from '../home/Home';
import Cliente from "../cliente/Cliente";

export default props =>
    <Routes>
        <Route exact path={'/'} element={<Home />} />
        <Route exact path={'/cliente'} element={<Cliente />} />
        {/*<Route path={'*'} element{<Home />} />*/}
    </Routes>