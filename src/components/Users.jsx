
import usersData from '../utils/users.json'

import Card from './Card';
import SearchUser from './SearchUser';

function Users(){
    return(
        <>
            <div className="search-user">
                <SearchUser/>
            </div>

            <hr className='users-style' />

            <div className="users-list">
                {
                    usersData.map((data)=>{
                        return  <Card key={data.userId} name={data.name} />
                    })
                }
            </div>
        </>
    )
}

export default Users;