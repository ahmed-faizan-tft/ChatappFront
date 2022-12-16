import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SearchIcon from '@mui/icons-material/Search';


function SearchUser(){
    return(
        <>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search user..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Text id="basic-addon2"><SearchIcon/></InputGroup.Text>
            </InputGroup>
        </>
    )
}

export default SearchUser;