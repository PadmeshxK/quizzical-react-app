import React from "react"
import './style.css'
import {motion} from 'framer-motion'

export default function QuizStartPage(props){

    const parentVariant={
        initial:{
            x:0
        },
        visible:{
            transition:{
                delayChildren:0.2,
                staggerChildren:0.8
            }
        }
    }

    const childrenVariant={
        initial:{ 
            x:'-3rem',
            opacity:0
        },
        visible:{
            x:0,
            opacity:1, 
            transition:{
                eaes:'easeOut',
                duration:1
            }
        }    
    }
    
    return(
        <motion.div 
            className="front-page"
            variants={parentVariant}
            animate='visible'
            initial='initial'
        >
            <motion.h1  variants={childrenVariant}>Quizzical</motion.h1>
            <motion.p variants={childrenVariant}>Welcome to Quizzical! Test your knowledge about the world!</motion.p>
            <motion.button variants={childrenVariant} onClick={props.onClick}>Start quiz</motion.button>
        </motion.div>      
    )
}