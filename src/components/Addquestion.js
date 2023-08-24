import React, { useContext, useState } from 'react'
import problemContext from '../context/problem/problemContext'

const Addquestion = (props) => {
    const context = useContext(problemContext)
    const {isLoading, addQuestion } = context;

    const [question, setquestion] = useState({ title: "", description: "" })
    
    const handleclick = (e) => {
        e.preventDefault();
        addQuestion(question.title, question.description);

        props.showAlert("Note added successfully", "success");

        setquestion({ title: "", description: "" });
    }
    const onchange = (a) => {
        setquestion({ ...question, [a.target.name]: a.target.value })
    }
    return (
        <div className='container my-3'>
            <h3>Add Note</h3>
            <form onSubmit={handleclick}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Note title</label>
                <input type="text" className="form-control" id="title" value={question.title} name="title" onChange={onchange} required minLength={5} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Note Description</label>
                <input style={{whiteSpace:"pre-line"}}  className="form-control" id="description" value={question.description} name='description' onChange={onchange} rows="3" required minLength={5}></input>
            </div>
            
            <div className="col-12">
                <button type="submit" disabled={question.title.length < 5 || question.description.length < 5} className=' btn btn-primary'> 
                {isLoading?<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:''}
                 Add Note
                 </button>
            </div>
            </form>
        </div>
    )
}

export default Addquestion
