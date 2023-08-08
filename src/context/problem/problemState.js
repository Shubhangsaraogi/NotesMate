import { useState } from "react"
import problemContext from "./problemContext"

const ProblemState = (props) => {
    const [question, setQuestion] = useState([]);

    const getQuestion = async () => {
        const response = await fetch(`${process.env.REACT_APP_HOST_URL}/api/question/fetchquestion/`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const result = await response.json();
        setQuestion(result);
    }
    const addQuestion = async (title, description, testCases) => {
        const response = await fetch(`${process.env.REACT_APP_HOST_URL}/api/question/addquestion`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, testCases })
        });
        const newQuestion = await response.json();
        setQuestion(question.concat(newQuestion));
    }
    const deleteQuestion = async (id) => {
        const response = await fetch(`${process.env.REACT_APP_HOST_URL}/api/question/deletequestion/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        await response.json();

        const newQuestion = question.filter((question) => { return question._id !== id })
        setQuestion(newQuestion);
    }
    const editQuestion = async (id, title, description, testCases) => {
        const response = await fetch(`${process.env.REACT_APP_HOST_URL}/api/question/updatequestion/${id}`, {
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
        setQuestion(newQuestion);
    }
    return (
        <problemContext.Provider value={{ question, addQuestion, deleteQuestion, editQuestion, getQuestion }}>
            {props.children}
        </problemContext.Provider>
    )
}
export default ProblemState;