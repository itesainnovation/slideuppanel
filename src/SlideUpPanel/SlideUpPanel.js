import React, {useState, useEffect, useRef} from 'react';
import Animated from "animated/lib/targets/react-dom";
import Interactable from "react-interactable/noNative";
import styles from './slideup.module.scss'
import Paper from "@material-ui/core/Paper";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import SwipeableViews from 'react-swipeable-views';
import Button from "@material-ui/core/Button";
import {PageBalls} from "../PageBalls/PageBalls";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";

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
    const [error, setError] = useState(false);

    const [form, setForm] = useState({
        name: '',
        zone: ''
    })

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

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

    //Aca es donde validamos si puede pasar sino restamos index
    useEffect(()=>{
        if (index === 1){
            if (!form.name || !form.zone){
                setIndex(index-1)
                setError(true);
            }
        }
    },[index])

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: styles.buttonBackground,
                contrastText: styles.buttonColor,
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
                                <span>{'🛒 Mensaje de start'}</span>
                            </div>
                        </div>
                        <SwipeableViews enableMouseEvents={true} index={index} onChangeIndex={handleChangeIndex}>
                           <div>
                               <p className={styles.slideTitle}> {
                                   'Titulo de slide'
                               } </p>
                               <TextField
                                   value={form.name}
                                   name={'name'}
                                   onChange={handleChange}
                                   error={error}
                                   label="Nombre"
                                   className={styles.field}
                                   margin="normal"
                                   variant="outlined"
                               />
                               <FormControl variant="outlined" className={styles.field}>
                                   <InputLabel
                                       htmlFor="outlined-age-simple"
                                   >
                                       Zona
                                   </InputLabel>
                                   <Select
                                       error={error}
                                       name={'zone'}
                                       value={form.zone}
                                       onChange={handleChange}
                                       input={
                                           <OutlinedInput
                                               className={styles.selectInput}
                                               labelWidth={40}
                                           />
                                       }
                                   >
                                       <MenuItem value="">
                                           <em>None</em>
                                       </MenuItem>
                                       <MenuItem value={'Buenos Aires'}>Buenos Aires</MenuItem>
                                       <MenuItem value={'Catamarca'}>Catamarca</MenuItem>
                                       <MenuItem value={'Caba'}>CABA</MenuItem>
                                       <MenuItem value={'Chaco'}>Chaco</MenuItem>
                                       <MenuItem value={'Chubut'}>Chubut</MenuItem>
                                       <MenuItem value={'Córdoba'}>Córdoba</MenuItem>
                                       <MenuItem value={'Corrientes'}>Corrientes</MenuItem>
                                       <MenuItem value={'Entre Ríos'}>Entre Ríos</MenuItem>
                                       <MenuItem value={'Formosa'}>Formosa</MenuItem>
                                       <MenuItem value={'La Pampa'}>La Pampa</MenuItem>
                                       <MenuItem value={'La Rioja'}>La Rioja</MenuItem>
                                       <MenuItem value={'Mendoza'}>Mendoza</MenuItem>
                                       <MenuItem value={'Misiones'}>Misiones</MenuItem>
                                       <MenuItem value={'Neuquén'}>Neuquén</MenuItem>
                                       <MenuItem value={'Río Negro'}>Río Negro</MenuItem>
                                       <MenuItem value={'Salta'}>Salta</MenuItem>
                                       <MenuItem value={'San Juan'}>San Juan</MenuItem>
                                       <MenuItem value={'San Luis'}>San Luis</MenuItem>
                                       <MenuItem value={'Santa Cruz'}>Santa Cruz</MenuItem>
                                       <MenuItem value={'Santa Fe'}>Santa Fe</MenuItem>
                                       <MenuItem value={'Santiago del Estero'}>Santiago del Estero</MenuItem>
                                       <MenuItem value={'Tierra del Fuego'}>Tierra del Fuego</MenuItem>
                                       <MenuItem value={'Tucumán'}>Tucumán</MenuItem>
                                   </Select>
                               </FormControl>
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