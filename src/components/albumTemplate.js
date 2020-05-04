import React from 'react';
import Album from './Album'
import { Link } from 'gatsby';

const AlbumTemplate = (props) =>{
return(
    <section>
        <Album
        albumTitle = {props.pageContext.title} 
        artistName = {props.pageContext.artist.name}
        albumSummary = {props.pageContext.summary}
        albumImage = {props.pageContext.localImage.childImageSharp.fixed}
       ><Link to = {'/'}>back</Link></Album>
    </section>
)
}
export default AlbumTemplate;