import { useState } from "react"

export default function Player({initalName,symbol,isactive}){
    const [playerName , setplayerName]=useState(initalName);
    const [IsEditing , setIsEditing ] = useState(false);

    function handleEditclick(){
        setIsEditing((editing)=> !editing) 
        // setIsEditing(!IsEditing)
        // setIsEditing(IsEditing ? false : true); second way
    }
    function handleChange(event){
        setplayerName(event.target.value);
    }
    let edittablePlayerName= <span className="player-name">{playerName}</span>
  
    if(IsEditing){
        edittablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />

    }
    return (
        <li className={isactive ? 'active' : undefined}>
          <span className="player">
              {edittablePlayerName}
              <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleEditclick}>{IsEditing ? 'Save' : 'Edit'}</button>
        </li>
        
    )
}