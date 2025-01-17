import React from 'react'
import QuizStartPage from './Components/QuizStartPage'
import blob1 from './Images/blob-1.svg'
import blob2 from './Images/blob-2.svg'
import QuestionsPage from './Components/QuestionsPage'
import {motion} from 'framer-motion'

export default function App(){
    React.useEffect(() => {
        document.title = "Quizzical";
    }, []); 
    const [pageTracker,setPageTracker] = React.useState(1)
    const [questionsArr,setQuestionsArr] = React.useState([])
    const [userAnswers,setUserAnswers] = React.useState({})
    const [quizCompletionState,setQuizCompletionState] = React.useState('start')
    const [answersIndArr, setAnswersIndArr] = React.useState([])
    const [animating,setAnimating] = React.useState(false)

    function handleChange(event,questionId,answerId){
        if (event.target.checked){
            setUserAnswers(prevObj => ({...prevObj,[questionId]:answerId}))
        }   
    }

    function handleSubmit(){
        const response = Object.values(userAnswers)
        setQuizCompletionState(response.length === 5?true:'displayError')
        if (quizCompletionState === true){
            setQuizCompletionState(false)
            setUserAnswers({})
        }
    }

    function scoreCounter(){
        const questionsLen = Object.values(userAnswers).length
        let score = 0
        for(let i=0;i < questionsLen;i++){
            let objKey = i.toString()
            if (userAnswers[objKey] === answersIndArr[objKey]){
                score += 1
            }
        }
        return score
    }

    function addToAnswersArr(questionInd,answerInd){
        setAnswersIndArr(prevObj => ({
            ...prevObj,
            [questionInd]:answerInd
        }))
    }
   
    
    React.useEffect(()=>{
        if (quizCompletionState === 'start' || quizCompletionState === false){
            fetch('https://opentdb.com/api.php?amount=5&type=multiple')
            .then(response => response.json())
            .then(data => setQuestionsArr(data.results))
        }
    },[quizCompletionState])

    function nextPageClick(){
        setAnimating(true)
        setTimeout(()=>{
            setPageTracker(previousPage => previousPage + 1)
            setAnimating(false)
        },1000)     
    }

    return(
        <>
        <img src={blob1} className='blob-1' alt='aBlob'/>
        <img src={blob2} className='blob-2' alt='a-blob'/>
     
        {
            pageTracker===1?
            (   
                <motion.div
                    animate={{
                        opacity:animating?0:1,
                    }}
                >
                    <QuizStartPage 
                        onClick={nextPageClick}
                    />
                </motion.div>   
            )   
            :
            <motion.div

            >
                <QuestionsPage 
                    questions={questionsArr}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    quizCompletionState={quizCompletionState}
                    userAnswers={userAnswers}
                    answersArr={answersIndArr}
                    scoreCounter={scoreCounter}
                    setAnswersArr={addToAnswersArr}
                />
            </motion.div>
        }
        
        </>
        
    )
}