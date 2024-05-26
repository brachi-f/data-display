import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon, Menu, MenuItem, MenuMenu } from "semantic-ui-react";
import * as actions from './store/action.jsx'
import Swal from "sweetalert2";


const Header = () => {
    const user = useSelector(s => s.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <>
            <Menu inverted stackable style={{ width: '100vw' }}>
                <MenuMenu position="right">

                    {user ? <>
                        <MenuItem
                            onClick={() => {
                                Swal.fire({
                                    icon:'success',
                                    timer:2000,
                                    position:'bottom-right',
                                    showConfirmButton:false,
                                    title:`Goodbye ${user.name}`
                                })
                                dispatch({ type: actions.SETUSER, data: null })
                                navigate('/home')
                            }}
                        >
                            <Icon name="user close" />
                        </MenuItem>
                    </> :
                        <>
                            <MenuItem
                                onClick={() => {
                                    navigate('/login')
                                }}
                            >
                                התחברות  <Icon name="user circle" />
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    navigate('/register')
                                }}
                            >
                                הרשמה <Icon name="user plus" />
                            </MenuItem>
                        </>}
                    <MenuItem onClick={() => navigate('/')}><Icon name="home" /></MenuItem>
                </MenuMenu>
            </Menu>
        </>
    )
}
export default Header;