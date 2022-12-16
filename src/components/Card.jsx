import avatar from '../asset/avatar1.jpg'
import Image from './Image'

function Card(props){
    const {name} = props;
    return(
        <>
            <div className="container">
              <Image image={avatar}/>
              <p>{name}</p>
            </div>
        </>
    );
}


export default Card;