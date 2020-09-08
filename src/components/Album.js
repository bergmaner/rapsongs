import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
const AlbumItem = styled.section`
border: 1px solid #ddd;
padding: 8px;
background: white;
margin-bottom: 8px;
display: flex;
h2{
    small{
        font-weight:normal;
    }
}
`;
const Button = styled.div`
text-align: right;
a{
    padding: 8px;
    background: #8080ff;
    color: white;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.6s;
&:hover{
   background: #3333ff;
  
}
}

`;

const AlbumContent = styled.div`
flex-grow: 1;
padding: 0px 10px;
`;

const AlbumImage = styled.div`
max-width: 235px;
margin-top: 65px;
img {
max-width: 235px;
margin: 0;
}

`;

const Album = ({ albumTitle, albumSummary, albumImage, artistName, children }) => {
return (
    <AlbumItem>
       <AlbumImage> <Img fixed = {albumImage} /></AlbumImage>
        <AlbumContent>
        <h2>
            {albumTitle} - <small>{artistName}</small>
        </h2>
            <p>{albumSummary}</p>
            <Button>{children}</Button>
            </AlbumContent>
    </AlbumItem>
)
};
export default Album;