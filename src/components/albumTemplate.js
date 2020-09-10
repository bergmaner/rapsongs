import React, { useContext } from 'react';
import Album from './Album'
import { Link } from 'gatsby';
import { Comments } from '../components/Comments';
import { FirebaseContext } from '../services/Firebase';

const AlbumTemplate = (props) =>{
    const { firebase } = useContext(FirebaseContext) || {};
return(
    <section>
        <Album
        albumTitle = {props.pageContext.title} 
        artistName = {props.pageContext.artist.name}
        albumSummary = {props.pageContext.summary}
        albumImage = {props.pageContext.localImage.childImageSharp.fixed}
       ><Link to = {'/'}>back</Link></Album>
       {
           firebase && 
           <Comments firebase = {firebase} albumId = {props.pageContext.id} />
       }
        
    </section>
)
}
export default AlbumTemplate;