import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import problemContext from '../context/problem/problemContext';
import Modal from './Modal';


const QuestionItem = (props) => {
    const { question } = props;
    const context = useContext(problemContext);
    const { deleteQuestion } = context;

    return (
        <div className='col-md-3 my-3'>
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{question.title}</h5>
                    <p className="card-text">
                        {question.description}
                    </p>
                    <p className="card-text">
                        {question.testCases}
                    </p>
                    <FontAwesomeIcon icon="fa-solid fa-trash " onClick={() => {
                        deleteQuestion(question._id);

                        props.showAlert("Note Deleted successfully", "success");
                        
                    }} className='mx-2 icon' />

                    <Modal id={question._id} title={question.title} description={question.description} testCases={question.testCases} showAlert={props.showAlert} />

                    <FontAwesomeIcon data-bs-toggle="modal" data-bs-target={"#" + question._id} icon="fa-solid fa-pen-to-square" className='mx-2 icon' />
                </div>
            </div>
        </div>
    )
}

export default QuestionItem
