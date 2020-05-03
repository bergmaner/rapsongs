import React from 'react';
import styled from 'styled-components';

const AlbumItem = styled.section`
h2{
    small{
        font-weight:normal;
    }
}
`;
const Album = ({ albumTitle, albumSummary, albumImage, artistName, children }) => {
return (
    <AlbumItem>
        <img src = {albumImage}/>
        <h2>
            {albumTitle} - <small>{artistName}</small>
        </h2>
            <p>{albumSummary}</p>
            <div>{children}</div>
    </AlbumItem>
)
};
export default Album;