import React, { useState, useContext } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { Form } from "../components/Form"
import { FirebaseContext } from "../services/Firebase"

const CreateArtist = () => {

  const [artistName, setArtistName] = useState("")
  const { firebase } = useContext(FirebaseContext) || {};
  const [succes, setSucces] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    firebase.createArtist({
        artistName
    }).then(() => {
        setArtistName("");
        setSucces(true);
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        onChange={e => {
          e.persist()
          setSucces(false);
          setArtistName(e.target.value)
        }}
        value={artistName}
        placeholder="Artist name"
      />
      {
          succes && 
          <span>Artist created succesfully</span>
      }
      <Button type="submit" block>
        Add new Artist
      </Button>
    </Form>
  )
}
export default CreateArtist
