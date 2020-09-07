import React, { useContext } from 'react';
import Album from './Album'
import { Link } from 'gatsby';
import { Comments } from '../components/Comments';
import { FirebaseContext } from '../services/Firebase';

const AlbumTemplate = ({pageContext}) =>{
    const { firebase } = useContext(FirebaseContext);
return(
    <section>
        <Album
        albumTitle = {pageContext.title} 
        artistName = {pageContext.artist.name}
        albumSummary = {pageContext.summary}
        albumImage = {pageContext.localImage.childImageSharp.fixed}
       ><Link to = {'/'}>back</Link></Album>
       {
           firebase && 
           <Comments firebase = {firebase} albumId = {pageContext.id} />
       }
        
    </section>
)
}
export default AlbumTemplate;