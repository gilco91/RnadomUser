import { useParams } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import { Card, CardMedia } from '@mui/material';

const UserPage = ({users}) => {
    const {userId} = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const userToShow = users.find((u) => u.dob.date === userId);
        setUser(userToShow)
    }, [users, userId])

    return user ? <div className="d-flex flex-column align-items-center m-3"><Card sx={{ maxWidth: 400 }}>
     <img
        height="250"
        className="w-150 rounded-circle"
        src={user.picture.large}
        alt={user.name.first}
      />
        <h1>{user.name.first[0]}. {user.name.last}</h1> 
        <h2>{user.email}</h2>
        <h2>{user.gender}</h2>
        <h2>{user.dob.age}</h2>
        </Card> </div>: null
}

export default UserPage