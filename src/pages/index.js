import React from "react"
import { Link,graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = (props) => {
  console.log(props);
  return(
  <Layout>
    {props.data.allAlbum.edges.map(edge =>(
      <div key = {edge.node.id}>
        <h2>{edge.node.title} - <small>{edge.node.artist.name}</small></h2>
        <div>{edge.node.summary}</div>
        <Link to ={`/album/${edge.node.id}`}>Join to conversation</Link>
      </div>))}

  </Layout>
  )
};

export const query = graphql`
query MyQuery {
  allAlbum {
    edges {
      node {
        id
        summary
        title
        artist {
          name
        }
      }
    }
  }
}
`;

export default IndexPage
