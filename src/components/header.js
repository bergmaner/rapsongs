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

const HeaderContent = styled.div`
  margin: 0 auto;
  max-width: 960;
  padding: 1.45rem 1.0875rem;
  display: flex;
  >h1{
    margin: 0;
    flex-grow: 1;
    >a{
      color: white;
      text-decoration: none;
    }
    >div{
      margin: auto 0;
    }
  }
  
  `;

  const Login = styled.div`
    margin: auto 0;
    a
    {
      color: white;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
    
  `;

  const UserInfo = styled.div`
  text-align: right;
  color: white;`;

const Header = ({ siteTitle }) => {
  const { firebase, user } = useContext(FirebaseContext);
  console.log(user);
function handleLogout(){
  firebase.logout().then( () => navigate('/login') );
}

  return(
  <HeaderWrapper>
    <HeaderContent>
      <h1>
        <Link to="/">
          {siteTitle}
        </Link>
      </h1>
        <div>
          { user && user.email &&
           <UserInfo>
             <div>Hello , {user.email}</div>
           <Logout onClick = {handleLogout}>Logout</Logout>
           </UserInfo>}
           { ( !user || !user.email ) && 
           <Login>
             <Link to ='/login'>Login</Link>
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
