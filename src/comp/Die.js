import './Die.css';
//     /* #59E391 green when selected */

export default function Die(props){

    const style = {
        backgroundColor: props.isHeld ? '#59E391' : '#FFFFFF'
    }

    return(
        <div
        style={style}
        className='die'
        onClick={()=>{props.holdDice(props.id)}}>
        <p>{props.value}</p></div>
    )
}