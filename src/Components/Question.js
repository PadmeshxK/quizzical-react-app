import './style.css'
import React from 'react'

export default function Question(props) {
    const [optionsArr, setOptionsArr] = React.useState([]);
    const [selectedValue, setSelectedValue] = React.useState('');
    const setAnswersArr = props.setAnswersArr;
    const questionId = props.id;
    let questionStr = props.question;
    const completionState = props.completionState;
    questionStr = decodeHtmlCharCodes(questionStr);
    const correctAnswer = decodeHtmlCharCodes(props.correct_answer);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    React.useEffect(() => {
        const optionsArrTemp = [props.correct_answer, ...props.incorrect_answers];
        const shuffledOptionsArrTemp = shuffleArray(optionsArrTemp);
        setOptionsArr(shuffledOptionsArrTemp.map(answer => decodeHtmlCharCodes(answer)));
    }, [props.correct_answer, props.incorrect_answers]);

    React.useEffect(() => {
        for (let i = 0; i < optionsArr.length; i++) {
            if (optionsArr[i] === correctAnswer) {
                setAnswersArr(questionId, i);
                break;
            }
        }
    }, [optionsArr, correctAnswer, questionId, setAnswersArr]); 

    React.useEffect(() => {
        if (completionState === false) {
            setSelectedValue('');
        }
    }, [completionState]);

    function handleSelectedValue(value) {
        if (value === selectedValue) {
            setSelectedValue('');
        } else {
            setSelectedValue(value);
        }
    }

    function setClassForInput(inputInd) {
        let classStr = 'answer-container';
        if (completionState === true) {
            classStr += ' completion-state';
            if (props.userAnswerInd === inputInd) {
                if (props.userAnswerInd === props.answerInd) {
                    classStr += ' correct-answer';
                } else {
                    classStr += ' wrong-answer';
                }
            }
            if (inputInd === props.answerInd && classStr !== 'answer-container correct-answer') {
                classStr += ' correct-answer';
            }
        }
        return classStr;
    }

    function decodeHtmlCharCodes(str) {
        const decodedString = document.createElement('textarea');
        decodedString.innerHTML = str;
        return decodedString.value;
    }

    const answerElements = optionsArr.map((answer, index) => (
        <label htmlFor={`answer-input-${questionId}${index}`} className={setClassForInput(index)} key={index}>
            {answer}
            <input
                type="radio"
                name={`answer${questionId}`}
                id={`answer-input-${questionId}${index}`}
                value={answer}
                checked={selectedValue === answer}
                onChange={(event) => {
                    props.handleChange(event, questionId, index);
                    handleSelectedValue(answer);
                }}
            />
        </label>
    ));

    return (
        <div className="question-container">
            <p className="question">{questionStr}</p>
            <div className="options-container">{answerElements}</div>
            <div className="line-divider"></div>
        </div>
    );
}
