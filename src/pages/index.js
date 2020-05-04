import React from "react";
import { Link,graphql } from "gatsby";
import Album from "../components/Album";

const IndexPage = (props) => {
  console.log(props);
  return(
  <section>
    {props.data.allAlbum.edges.map(edge =>(
      <Album 
      key = {edge.node.id}
      albumSummary = {edge.node.summary}
      albumTitle = {edge.node.title}
      albumImage = {edge.node.localImage.childImageSharp.fixed}
      artistName = {edge.node.artist.name}
      >
        <Link to ={`/album/${edge.node.id}`}>Join to conversation</Link>
      </Album>))}

  </section>
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
        localImage {
          childImageSharp {
            fixed(width: 235) {
              base64
              width
              height
              src
              srcSet
            }
          }
        }
        artist {
          name
        }
      }
    }
  }
}
`;

export default IndexPage
