import React, { useContext, useState } from 'react'
import problemContext from '../context/problem/problemContext'

const Modal = (props) => {
    const context = useContext(problemContext);
    const { editQuestion } = context;

    const [question, setquestion] = useState({ title: props.title, description: props.description})
    
    const handleclick = (e) => {
        e.preventDefault();
        editQuestion(props.id, question.title, question.description);
        props.showAlert("Note updated successfully","success");
    }
    const onchange = (a) => {
        setquestion({ ...question, [a.target.name]: a.target.value })
    }

    return (
        <>
            <div className="modal fade"  id={props.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header ">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">New Title</label>
                                <input type="text" className="form-control" id="title" name='title' onChange={onchange} value={question.title}  required minLength={5} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">New Description</label>
                                <textarea className="form-control" id="description" name='description' onChange={onchange} value={question.description} rows="3" required minLength={5}></textarea>
                            </div>
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={question.title.length<5||question.description.length<5}  type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleclick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Modal
