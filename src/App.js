import React, {useEffect, useState} from 'react';
import './App.css';
import { StylesProvider } from '@material-ui/core/styles';
import Div100vh from "./utils/lib";
import {SlideUpPanel} from "./SlideUpPanel/SlideUpPanel";
import {Loader} from "./Loader/Loader";
import $ from 'jquery';

function clearLoader() {
    $("#loading").fadeOut();
    $("#loading .object").delay(700).fadeOut("slow");
    $('.fadeInOnLoad').delay(700).fadeTo("slow", 1);
}


function App() {

    const [dontResize, setDontResize] = useState(false);

    useEffect(()=>{
        clearLoader();
        setTimeout(()=>{setDontResize(true)}, 500)
    },[])


    return (
        <StylesProvider injectFirst>
            <Div100vh dontResize={dontResize} className="App">
                <Loader/>
                <SlideUpPanel/>
            </Div100vh>
        </StylesProvider>
    );
}

export default App;
