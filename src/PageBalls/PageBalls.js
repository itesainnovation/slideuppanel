import React, {useState, useEffect} from 'react';
import styles from './pageballs.module.scss'

export function PageBalls({index, steps}) {

    useEffect(() => {

    },[]);

    return (
        <div className={styles.ballsWrapper}>
            {Array.from(Array(steps), (e,i) => {
                return (
                    <div style={i === 0 ? {marginLeft: 0} : {} } className={index === i ? styles.pageBallSelected : styles.pageBall}/>
                )
            })}
        </div>
    )
}