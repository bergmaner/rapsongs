import { Link, navigate } from 'gatsby';
import PropTypes from 'prop-types';
import React,{useContext} from 'react';
import { FirebaseContext } from '../services/Firebase';
import styled from 'styled-components';

const Logout = styled.span`
color: white;
text-decoration: none;
&:hover{
  text-decoration: underline;
  cursor: pointer;
}
`;

const HeaderWrapper = styled.div`
  background: #8080ff;
  margin-bottom: 1.45rem;
`;

const Divider = styled.span`
margin: 0 8px;
padding-right: 1px;
background: #ddd;
`;

const StyledLink = styled(Link)`
color: white;
text-decoration: none;
&:hover {
  text-decoration: underline;
  cursor: pointer;
}
`

const HeaderContent = styled.div`
  margin: 0 auto;
  max-width: 960;
  padding: 1.45rem 1.0875rem;
  display: flex;
  align-items: center;
  >h1{
    margin: 0;
    height: 54px;
    flex-grow: 1;
    >a:hover{
     text-decoration: none;
    }
    >div{
      margin: auto 0;
    }
  }
  
  `;

  const Login = styled.div`
    margin: auto 0;
  `;

  const UserInfo = styled.div`
  text-align: right;
  color: white;
  font-size: 16px;`;

const Header = ({ siteTitle }) => {
  const { firebase, user } = useContext(FirebaseContext) || {};
  console.log(user);
function handleLogout(){
  firebase.logout().then( () => navigate('/login') );
}

  return(
  <HeaderWrapper>
    <HeaderContent>
      <h1>
        <StyledLink to="/">
          {siteTitle}
        </StyledLink>
      </h1>
        <div>
          { user && user.email &&
           <UserInfo>
             <div>Hello , {user.username || user.email}</div>
             {
              user && user.isAdmin && 
               <>
                <StyledLink to="/createArtist">Create Artist</StyledLink>
                <Divider/>
                <StyledLink to="/createAlbum">Create Album</StyledLink>
                <Divider/>
               </>
             }
           <Logout onClick = {handleLogout}>Logout</Logout>
           </UserInfo>}
           { ( !user || !user.email ) && 
           <Login>
             <StyledLink to ='/login'>Login</StyledLink>
             <Divider/>
             <StyledLink to ='/register'>Register</StyledLink>
          </Login>}
        </div>
    </HeaderContent>
  </HeaderWrapper>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
