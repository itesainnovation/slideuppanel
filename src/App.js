import React, {useEffect, useState} from 'react';
import './App.css';
import { StylesProvider } from '@material-ui/core/styles';
import Div100vh from "./utils/lib";
import {SlideUpPanel} from "./SlideUpPanel/SlideUpPanel";
import {Loader} from "./Loader/Loader";
import $ from 'jquery';
import { Gradient } from 'react-gradient';

function clearLoader() {
    $("#loading").fadeOut();
    $("#loading .object").delay(700).fadeOut("slow");
    $('.fadeInOnLoad').delay(700).fadeTo("slow", 1);
}

var Color = require('color');


function App() {

    const [dontResize, setDontResize] = useState(false);

    const [gradients, setGradients] = useState([
        ['#F8B133', '#36284D'],
        ['#36284D', '#F8B133'],
    ]);
    const [loaded, setLoaded] = useState(false)
    useEffect(()=>{
        clearLoader();
        setTimeout(()=>{setDontResize(true)}, 500)

        let color = Color('#335ef8');
        console.log(color.negate())
        let colors = [
            [color.hex(), color.negate().hex(), color.hex()]
            ,[color.negate().hex(), color.hex(), color.negate().hex()]
        ];
        setGradients(colors);
        setTimeout(()=>{setLoaded(true)},10)

    },[])



    return (
        <StylesProvider injectFirst>
            <Div100vh dontResize={dontResize} className="App">
                <Loader/>
                {/*{loaded &&
                <Gradient
                    style={{height: '100%', width: '100vw'}}
                    gradients={ gradients } // required
                    property="background"
                    duration={ 3000 }
                    //transitionType="sequential"
                    angle="45deg"
                />
                }*/}

                <SlideUpPanel/>
            </Div100vh>
        </StylesProvider>
    );
}

export default App;
