import React, { Component } from 'react';
import './Note.css'

class Note extends Component{
    constructor(props){
        super(props);
        this.state = {
            curTime : new Date().toLocaleString(),
            note: ''
        }
        this.handleRemove = this.handleRemove.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleRemove(){
        this.props.removeNote(this.props.id)
    }
    toggleForm(){
        this.setState({
            isEditing: !this.state.isEditing
        })
    }
    handleUpdate(evt){
        evt.preventDefault();
        // this.props.updateRecipe(this.props.id, this.state.ingridents)
        console.log( `this is the state in handleUpdate ${this.state.note} `)
        this.props.updateNote(this.props.id, this.state);   
        
        this.setState({
            isEditing: false
        })
    }
    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    render(){
        let result;
        if(this.state.isEditing){
            result = (
                <form onSubmit={this.handleUpdate}>
                <textarea
                    onChange={this.handleChange}
                    name='note'
                    value={this.state.note}
                />
                <button>Save</button>
                </form>
            )
        }else{
            result = (
                <div>
                <form onSubmit={this.handleSubmit}>
                </form>
            </div>
            )
        }
        return(
            <div className='container'>
                <div className='content'>{this.props.content}</div>
                {result}
                <div className='timeDiv'>
                    <span className='time'>{this.state.curTime}</span>
                </div>
                
                <button className='deleteBtn' onClick={this.handleRemove}>Delete</button><button onClick={this.toggleForm} className='editBtn'>Edit</button>
            </div>
        )
    }
}

export default Note;
