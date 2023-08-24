import { useState } from "react"
import problemContext from "./problemContext"

const ProblemState = (props) => {
    const [question, setQuestion] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const getQuestion = async () => {
        setIsLoading(true);
        console.log(process.env.REACT_APP_HOST_URL);
        console.log(process.env.REACT_APP_HOST_URI);
        const response = await fetch(`${process.env.REACT_APP_HOST_URI}/api/question/fetchquestion/`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const result = await response.json();
        setIsLoading(false);
        setQuestion(result);
    }
    const addQuestion = async (title, description, testCases) => {
        // console.log(process.env.REACT_APP_HOST_URL);
        setIsLoading(true);
        const response = await fetch(`${process.env.REACT_APP_HOST_URI}/api/question/addquestion`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, testCases })
        });
        const newQuestion = await response.json();
        setIsLoading(false);
        setQuestion(question.concat(newQuestion));
    }
    const deleteQuestion = async (id) => {
        setIsLoading(true);
        const response = await fetch(`${process.env.REACT_APP_HOST_URI}/api/question/deletequestion/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        await response.json();

        const newQuestion = question.filter((question) => { return question._id !== id })
        setIsLoading(false);
        setQuestion(newQuestion);
    }
    const editQuestion = async (id, title, description, testCases) => {
        setIsLoading(true);
        const response = await fetch(`${process.env.REACT_APP_HOST_URI}/api/question/updatequestion/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, testCases })
        });
        await response.json();
        const newQuestion = JSON.parse(JSON.stringify(question));
        for (let index = 0; index < newQuestion.length; index++) {
            const element = newQuestion[index];
            if (element._id === id) {
                newQuestion[index].title = title;
                newQuestion[index].description = description;
                newQuestion[index].testCases = testCases;
                break;
            }
        }
        setIsLoading(false);
        setQuestion(newQuestion);
    }
    return (
        <problemContext.Provider value={{ isLoading, question, addQuestion, deleteQuestion, editQuestion, getQuestion }}>
            {props.children}
        </problemContext.Provider>
    )
}
export default ProblemState;