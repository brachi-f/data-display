import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon, Menu, MenuItem, MenuMenu } from "semantic-ui-react";



const Header = () => {
    const user = useSelector(s => s.user)
    const navigate = useNavigate()
    return (
        <>
            <Menu inverted stackable style={{width: '100vw'}}>
                <MenuMenu position="right">
                    
                    {user? <>
                    </>:
                    <>
                        <MenuItem
                        onClick ={()=>{
                            navigate('/login')
                        }}
                        >
                            התחברות  <Icon name="user circle" />  
                        </MenuItem>
                        <MenuItem
                        onClick ={()=>{
                            navigate('/signup')
                        }}
                        >
                           הרשמה <Icon name="user plus" /> 
                        </MenuItem>
                    </>}
                    <MenuItem onClick={()=>navigate('/')}><Icon name="home"/></MenuItem>
                </MenuMenu>
            </Menu>
        </>
    )
}
export default Header;