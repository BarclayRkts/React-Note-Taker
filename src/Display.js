import React, { Component } from 'react'
import Note from './Note';
import NewNoteForm from './NewNoteForm';
import Data from './Data';
import './Display.css';

export default class Display extends Component {
    constructor(props){
        super(props);
        this.state = {
            notes: [Data[0],Data[1]],
            visible: true
        }
        this.create = this.create.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.currentDate = this.currentDate.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        // this.randomBetween = this.randomBetween.bind(this);
    }
    create(newNote){
        this.setState({
            notes: [...this.state.notes, newNote]
        })
    }
    handleClick(){
        this.setState({
            visible: !this.state.visible
        })
    }
    remove(id){
        console.log(id)
        this.setState({
            notes: this.state.notes.filter(note => note.id !== id)
        });
    }
    currentDate(separator='-'){
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}${separator}${year}`
    }
    update(id, updatedNote){
        const updatedNotes = this.state.notes.map(note => {
            if(note.id === id){
                // return { ...recipe, ingredients: updatedRecipe };
                return { ...note, note: updatedNote.note}
            }
            return note;
        })
        this.setState({notes: updatedNotes})
    }
    render() {
        const notes = this.state.notes.map((note, index) => {
            return (
                <div>
                    <Note id={note.id} date={this.currentDate} time={this.state.curTime} key={note.id} updateNote={this.update} content={note.note} removeNote={this.remove}/>
                </div>
            )
        });
        return (
            <div className='display'>
                <h1>Sticky Note Taker</h1>
                <NewNoteForm createNote={this.create}/>
                <div className='allNotes'>
                    {notes}
                </div>
            </div>
        )
    }
}
