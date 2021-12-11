import React, { useState, useEffect} from 'react';
import axios from 'axios';
import ButtonAvatar from '../Buttons/ButtonAvatar';
import ColorCheckManagement from '../Team/ColorCheckManagement';
import LARAVEL_SERVER from '../Variable';
import { useAppContext } from '../../Context';
import ButtonColorChange from '../Buttons/ButtonColorChange';

const FormCreateTeam = () =>{
   
const [avatar, setAvatar]=useState("");
const [name, setName]=useState("");
const [errors, setErrors]=useState([]);
const { state, dispatch } = useAppContext();
const [clicked1, setClicked1]=useState(false);
const [clicked2, setClicked2]=useState(false);
const [clicked3, setClicked3]=useState(false);
const [clicked4, setClicked4]=useState(false);
const [color, setColor]=useState("");


useEffect(() => {
    axios.get(`${LARAVEL_SERVER}/color`)
    .then(res => {
        
        setColor(res.data.data);
    },1000)
    },[]);

const handleSubmit = event =>{
    event.preventDefault()
    console.log("team créée")
    const id = localStorage.getItem('token');
    console.log(id)
    let bodyFormData = new FormData();
    bodyFormData.set('name', name)
    bodyFormData.set('avatar', avatar)
    bodyFormData.set('color', state.teamColor)
    bodyFormData.set('user_id', id)
    let headers = {headers:{'API_TOKEN':localStorage.getItem('token')}}
    axios.post(`${LARAVEL_SERVER}/teamBuilding`, bodyFormData, headers)
        .then(response => console.log(response))
        .catch(error =>{
            if(error.response.status === 401){
                this.setState({errors: error.response.data.errors}, ()=>{
                    console.log(this.state)
                })
            }
            console.log(error.response)
        })               
}

const handleNameChange= event =>{setName(event.target.value)}
const handleAvatarChange= event =>{setAvatar(event.target.value)}
 const handleColorChange1 = () =>{
    dispatch({type:"SET_TEAM_COLOR", value:"green"}); 
    setClicked1(true);
    dispatch({type:"GREEN", value:1});
}
const handleColorChange2 = () =>{
    dispatch({type:"SET_TEAM_COLOR", value:"red"}); 
    setClicked2(true);
    dispatch({type:"RED", value:1});
}
const handleColorChange3 = () =>{
    dispatch({type:"SET_TEAM_COLOR", value:"blue"});
    setClicked3(true);
    dispatch({type:"BLUE", value:1});

}
const handleColorChange4 = () =>{
    dispatch({type:"SET_TEAM_COLOR", value:"yellow"});
    setClicked4(true);
    dispatch({type:"YELLOW", value:1});
}


        return(
            <>
                <form method="POST" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="teamName" className="form-label" >Nom de l'équipe</label>
                        <input onChange={handleNameChange} type="text" className="form-control" id="teamName" aria-describedby="emailHelp" className={`form-control ${errors && errors.name ? "is-invalid" : ""}`}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Choisir l'avatar</label>
                        <div className="row justify-content-md-center">
                            <div className="col-12">
                           <ButtonAvatar onClickAvatar={handleAvatarChange}/>
                             </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Choisir la couleur de l'équipe</label> 
                        <div className="row justify-content-md-center">

                       {!state.color.green
                       ?
                       <ButtonColorChange onClickColor={handleColorChange1} is_disabled="" backgroundColor="green"/>
                        :
                        <ButtonColorChange onClickColor={handleColorChange1} is_disabled="disabled" backgroundColor="grey"/>
                       }
                       {!state.color.red
                       ?
                       <ButtonColorChange onClickColor={handleColorChange2} is_disabled="" backgroundColor="red"/>
                        :
                        <ButtonColorChange onClickColor={handleColorChange2} is_disabled="disabled" backgroundColor="grey"/>
                       }
                       {!state.color.blue
                        ?
                        <ButtonColorChange onClickColor={handleColorChange3} is_disabled="" backgroundColor="blue"/>
                         :
                         <ButtonColorChange onClickColor={handleColorChange3} is_disabled="disabled" backgroundColor="grey"/>
                        }
                        {!state.color.yellow
                       ?
                       <ButtonColorChange onClickColor={handleColorChange4} is_disabled="" backgroundColor="yellow"/>
                        :
                        <ButtonColorChange onClickColor={handleColorChange4} is_disabled="disabled" backgroundColor="grey"/>
                       }

                        </div>                                      
                    </div>
                </form>
                        <ColorCheckManagement color={"green"} checked={clicked1} idColor={1}/>
                        <ColorCheckManagement color={"red"} checked={clicked2} idColor={2}/>
                        <ColorCheckManagement color={"blue"} checked={clicked3} idColor={3}/>
                        <ColorCheckManagement color={"yellow"} checked={clicked4} idColor={4}/>
            </>
        )
}

export default FormCreateTeam;