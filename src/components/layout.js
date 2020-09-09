import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { FirebaseContext,useAuth } from '../services/Firebase'
import Header from "./header";
import styled from "styled-components";
import "./layout.css";

const LayoutContainer = styled.div`
margin: 0 auto;
max-width: 960px;
min-height: calc(100vh - 132px);
padding: 0 1.0875rem 1.45rem;
display: flex;
flex-direction: column;
justify-content: center;

`;

const Layout = ({ children }) => {
  const {user, firebase, loading} = useAuth();
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <FirebaseContext.Provider value = {{user, firebase, loading}}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <LayoutContainer>
        <main>{children}</main>
      </LayoutContainer>
    </FirebaseContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
