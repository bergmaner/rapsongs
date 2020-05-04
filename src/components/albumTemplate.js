import React from 'react';
import Layout from './layout';
import Album from './Album'
import { Link } from 'gatsby';

const AlbumTemplate = (props) =>{
return(
    <Layout>
        <Album
        albumTitle = {props.pageContext.title} 
        artistName = {props.pageContext.artist.name}
        albumSummary = {props.pageContext.summary}
        albumImage = {props.pageContext.localImage.childImageSharp.fixed}
       ><Link to = {'/'}>back</Link></Album>
    </Layout>
)
}
export default AlbumTemplate;