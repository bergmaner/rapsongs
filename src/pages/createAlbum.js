import React, { useState, useEffect, useContext } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { Form } from "../components/Form"
import { FirebaseContext } from "../services/Firebase"
import styled from 'styled-components';

const FormField = styled.div`
  margin-bottom: 20px;
`
let fileReader;
if(typeof window !== 'undefined'){
  fileReader = new FileReader();
}

const CreateAlbum = () => {
  const [albumName, setAlbumName] = useState("")
  const [artists, setArtists] = useState([])
  const { firebase } = useContext(FirebaseContext)
  const [image, setImage] = useState('');
  const [artistId, setArtistId] = useState('');
  const [summary, setSummary] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (firebase) {
      firebase.getArtists().then(snapshot => {
        const avaibleArtists = [];

        snapshot.forEach(doc =>{
            avaibleArtists.push({
                id: doc.id,
                ...doc.data()
            })
        })
        setArtistId(avaibleArtists[0].id);
        setArtists(avaibleArtists);
      })
    }
  }, [firebase])

  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    }
  }, [])

  useEffect(() => {
    fileReader.addEventListener('load', () => {
      setImage(fileReader.result);
    })
  }, []);

  return (
    <Form onSubmit={(e) => {
        e.preventDefault();
        firebase.createAlbum({
          image,
          albumName,
          artistId,
          summary
        }).then(() => {
          if(isMounted) {
            setSuccess(true)
          }
        })
      }}>
        <FormField>
          <Input placeholder="album name" value={albumName} onChange={e => {
            e.persist();
            setSuccess(false);
            setAlbumName(e.target.value)
          }} />
        </FormField>
        <FormField>
          <strong>
            Artist
          </strong>
          <div>
            <select value={artistId} onChange={e => {
              e.persist();
              setSuccess(false);
              setArtistId(e.target.value)
            }}>
              {artists.map(artist => (
                <option key={artist.id} value={artist.id}>
                  {artist.name}
                </option>
              ))}
            </select>
          </div>
        </FormField>
        <FormField>
          <strong>
            Image
          </strong>
          <Input type="file" onChange={e => {
            e.persist();
            setSuccess(false);
            fileReader.readAsDataURL(e.target.files[0])
          }} />
        </FormField>
        <FormField>
          <strong>
            Summary
          </strong>
          <Input placeholder="album summary" value={summary}
            onChange={e => {
              e.persist();
              setSuccess(false);
              setSummary(e.target.value)
            }}/>
        </FormField>
        {success &&
          <span>
            New album added successfully!
          </span>
        }
        <Button block type="submit">
          Add new album
        </Button>
      </Form>
  )
}
export default CreateAlbum
