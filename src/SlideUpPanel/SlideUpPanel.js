import React, {useState, useEffect, useRef} from 'react';
import Animated from "animated/lib/targets/react-dom";
import Interactable from "react-interactable/noNative";
import styles from './slideup.module.scss'
import Paper from "@material-ui/core/Paper";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import SwipeableViews from 'react-swipeable-views';
import Button from "@material-ui/core/Button";
import {PageBalls} from "../PageBalls/PageBalls";

let posX = new Animated.Value(0);
const interStyle = {
    inter: {
        position: 'fixed',
        bottom: 0,
        zIndex: 1400,
    },
    interAbs: {
        position: 'fixed',
        bottom: 0,
        zIndex: 1400,
    }
};

export function SlideUpPanel({}) {

    const componentRef = useRef(null);
    const panelRef = useRef(null);
    const [panelHeight, setPanelHeight] = useState(150);
    const [panelOpen, setPanelOpen] = useState(false);
    const [toggleStyle, setToggleStyle] = useState({})
    const [index, setIndex] = useState(0);



    useEffect(() => {
        updatePanel();
        setTimeout(()=>{updatePanel()}, 200)
    },[]);


    const updatePanel = () => {
        setToggleStyle({
            fontSize: '30px',
            transform: [{ rotate: toggleRotation(panelRef.current.offsetHeight) }],
            WebkitTransform: [{ rotate: toggleRotation(panelRef.current.offsetHeight) }],
        });
        setPanelHeight(panelRef.current.offsetHeight);
    };

    const toggleOpen = () => {
        if (panelOpen){
            componentRef.current.snapTo({index: 0});
        } else {
            componentRef.current.snapTo({index: 1});
        }
    };
    const toggleRotation = (height) => {
        if (height < 80){
            height = 81;
        }
        return posX.interpolate({
            inputRange: [0, (80 - height) * -1],
            outputRange: [ "0deg", "180deg"]
        })
    };

    const onDrawerSnap = (event) => {
        if (event.index){
            setPanelOpen(true)
            componentRef.current.props.style.position = 'fixed';
        }else{
            setPanelOpen(false)
            componentRef.current.props.style.position = 'fixed';
        }
    };



    const handleChangeIndex = newIndex => {
        setIndex(newIndex);
    };


    const refreshHeight = () =>{
        setTimeout(()=>{
            updatePanel()
            componentRef.current.snapTo({index: 1});
        }, 100)
    };

    const onNext = () =>{
        handleChangeIndex(index + 1);
    };



    const theme = createMuiTheme({
        palette: {
            primary: {
                main: styles.buttonBackground,
                contrastText: styles.buttonColor
            },
            secondary: {
                main: '#ff0013',
                contrastText: '#ffffff'
            },

        },
        typography: { useNextVariants: true },
    });


    return (
        <ThemeProvider theme={theme}>
            <Interactable.View
                id={'inter'}
                ref={componentRef}
                animatedValueY={posX}
                boundaries={{top: 80 - panelHeight, bottom: 0, bounce: 1}}
                snapPoints={[{ y: 0 }, { y: 80 - panelHeight }]}
                verticalOnly={true}
                dragEnabled={true}
                style={interStyle.inter}
                onSnap={onDrawerSnap}
            >
                <div className={styles.panelContainer}>
                    <Paper elevation={3} ref={panelRef} className={styles.panel}>
                        <div onClick={toggleOpen} className={styles.panelHeader}>
                            <Animated.div style={toggleStyle}><i style={{color: '#36284D'}} className={'ion-md-arrow-dropup'}/></Animated.div>

                            <div className={styles.startMessage}>
                                <span>{'Mensaje de start'}</span>
                            </div>
                        </div>
                        <SwipeableViews enableMouseEvents={true} index={index} onChangeIndex={handleChangeIndex}>
                           <div style={{height: 200}}>
                               <p className={styles.slideTitle}> {
                                   'Titulo de slide'
                               } </p>
                           </div>
                        </SwipeableViews>
                        <div className={styles.bottomContainer}>
                            <PageBalls index={index} steps={6}/>
                                <Button onClick={onNext} color="primary" className={styles.nextButton}>
                                    {'SIGUIENTE'}
                                </Button>
                        </div>

                    </Paper>
                </div>
            </Interactable.View>
        </ThemeProvider>

    )
}