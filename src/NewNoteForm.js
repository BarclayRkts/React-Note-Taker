import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './NewNoteForm.css';

export default class NewNoteForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing: false,
            note: 'This is a new sticky note'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(evt){
        this.setState({
            [evt.target.name] : evt.target.value
        })
    }
    handleSubmit(evt){
        evt.preventDefault();
        this.props.createNote({...this.state, id: uuidv4()});
        this.setState({note: ''})
    }
    toggleForm(){
        this.setState({
            isEditing: !this.state.isEditing
        })
    }
    render() {
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
                    {/*<textarea
                    onChange={this.handleChange}
                    name='note'
                    value={this.state.note}
                    />*/}
                    <button>Add Note</button>
                </form>
            </div>
            )
        }
        return result;
    }
}