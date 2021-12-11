import React from 'react';
import axios from 'axios';
import FormCreateAnswer2 from './FormCreateAnswer2';
import LARAVEL_SERVER from '../Variable';

class FormCreateAnswer1 extends React.Component{
    constructor(props){
        super(props)
        this.state={
            errors:[],
            answer:[],
            is_valid:0,
            displayAnswer2:false,
            hideButtonAnswer1:false,
            disabled:false
        }
    }

handleAnswerChange   = event =>{this.setState({answer: event.target.value}, ()=>{})}
handleAnswerValid1   = event =>{this.setState({is_valid: parseInt(event.target.value)}, ()=>{})}

handleSubmitAnswer1= event =>{
    event.preventDefault()
    console.log("answer enregistrée")
    let bodyFormData = new FormData();
    bodyFormData.set('answer', this.state.answer)
    bodyFormData.set('is_valid', this.state.is_valid)
    axios.post(`${LARAVEL_SERVER}/answer`, bodyFormData)
            .then(res=>{
                this.setState({displayAnswer2:true})
                this.setState({hideButtonAnswer1:true})
                this.setState({disabled:true})
            })  
            .catch(error =>{
            if(error.response.status === 401){
                this.setState({errors: error.response.data.errors}, ()=>{console.log(this.state)})
            }
            console.log(error.response)
            }) 
}


    render(){
        const numVrai=1;
        const numFaux=0; 
        return(
            <>
                <form method="POST"  onSubmit={this.handleSubmitAnswer1}>
                    <label for="answer" class="form-label">Réponse 1: </label>
                    {this.state.disabled
                    ?
                    <>
                    <textarea name="answer1" disabled type="text" id="answer"/>
                    <select className="select" disabled class="form-select" aria-label="Default select example" onChange={this.handleAnswerValid1}>
                            <option value={numVrai} selected>Vrai/Faux?</option>
                            <option value={numVrai}>Vrai</option>
                            <option value={numFaux}>Faux</option>   
                    </select>
                    <p className="indicationQuiz">Votre réponse a bien été enregistrée</p>
                    </>
                    :
                    <>
                    <textarea name="answer1" onChange={this.handleAnswerChange} type="text" id="answer"/>
                    <select className="select" class="form-select" aria-label="Default select example" onChange={this.handleAnswerValid1}>
                            <option value={numVrai} selected>Vrai/Faux?</option>
                            <option value={numVrai}>Vrai</option>
                            <option value={numFaux}>Faux</option>   
                    </select>
                    </>
                    }
                    {this.state.hideButtonAnswer1 ? "" : <button type="submit" class="btn btn-info">+</button>}
                </form>
             {this.state.displayAnswer2
            ? 
            <FormCreateAnswer2/>
            :
            ""           
        }
            </>
        )
    }
}

export default FormCreateAnswer1;