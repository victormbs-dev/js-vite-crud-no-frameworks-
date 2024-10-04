import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { userModelToLocalHost } from "../mappers/user-localhost-mapper";
import { User } from "../models/user";

/**
 *
 * @param {Like<User>} userLike
 */
 export const saveUser = async(userLike) => {
    
    const user = new User(userLike);

    if ( !user.firstName || !user.lastName )
        throw 'First and last name are required';

    const userToSave = userModelToLocalHost( user ); //mapper to save user
    let userUpdated;

    if (user.id) {
        return await updateUser(userToSave);
    } else {
        userUpdated = await createUser( userToSave )
    }

    return localhostUserToModel( userUpdated );

}


/**
  * 
  * @param {Like<User>} user 
  */
const createUser = async( user ) => {

    const url = `${ import.meta.env.VITE_BASE_URL}/users`;
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const newUser = await res.json();
    console.log({newUser});

    return newUser;
    

}

/**
  * 
  * @param {Like<User>} user 
  */
const updateUser = async( user ) => {

    const url = `${ import.meta.env.VITE_BASE_URL}/users/${ user.id }`;
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const updatedUser = await res.json();
    console.log({updatedUser});

    return updatedUser;
    

}
