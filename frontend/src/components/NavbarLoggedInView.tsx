import React from 'react'
import { Button, Navbar } from 'react-bootstrap'
import { User } from '../models/user'
import * as NotesApi from '../network/notes_api'

interface NavbarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}


const NavbarLoggedInView = ({user, onLogoutSuccessful} : NavbarLoggedInViewProps) => {

    async function logout() {
        try {
            await NotesApi.logout()
            onLogoutSuccessful()
        } catch (error) {
            console.error(error)
            alert(error)
        }
    }

  return (
    <>
    <Navbar.Text className='me-2' >
        Signed In as: {user.username}
    </Navbar.Text>
    <Button onClick={logout}  >
        Log Out
    </Button>
    </>
  )
}

export default NavbarLoggedInView