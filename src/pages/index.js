import React from "react";
import { Link,graphql } from "gatsby";
import Album from "../components/Album";
import Layout from "../components/layout";

const IndexPage = (props) => {
  console.log(props);
  return(
  <Layout>
    {props.data.allAlbum.edges.map(edge =>(
      <Album 
      key = {edge.node.id}
      albumSummary = {edge.node.summary}
      albumTitle = {edge.node.title}
      albumImage = {edge.node.image}
      artistName = {edge.node.artist.name}
      >
        <Link to ={`/album/${edge.node.id}`}>Join to conversation</Link>
      </Album>))}

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
        image
        artist {
          name
        }
      }
    }
  }
}
`;

export default IndexPage
