import React, { useContext, useEffect } from 'react'
import problemContext from '../context/problem/problemContext'
import QuestionItem from './QuestionItem';
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

const Question = (props) => {
    let history = useHistory();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            props.showAlert("Please login first", "danger");
            history.push('/login')
        }
        // eslint-disable-next-line
    }, [])
    const context = useContext(problemContext);
    const { question, getQuestion } = context;
    useEffect(() => {
        getQuestion();
        // eslint-disable-next-line
    }, [])
    let questions = Array.from(question)
    return (
        <div className="container">
            <div className='row my-3 '>
                <h3>Your Questions</h3>
                <div className="container">
                    {question.length === 0 && "No Notes to display"}
                </div>
                {
                    questions && questions.map((question) => {
                        return <QuestionItem key={question._id} question={question} showAlert={props.showAlert} />;
                    })
                }
            </div>
        </div>
    )
}

export default Question