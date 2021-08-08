import React, { useEffect } from "react";
// import { useFirestoreDocData, useFirestore } from "reactfire";
import { useAppDispatch } from "./app/hooks";
import { Artist, fetchArtists } from "./features/artists/artistsSlice";
import { shallowEqual, useSelector } from "react-redux";

interface RootState {
  artists: Artist[];
  loading: boolean;
}

type ArtistProps = {
  name: string,
  genre?: string,
}

const ArtistDetails = ({ name, genre }: ArtistProps) => {
  if (!name) {
    return <p>Missing artist info</p>;
  }

  return (
    <>
      <h4>{name}</h4>
      <p>{genre}</p>
    </>
  );
}

function App() {
  const dispatch = useAppDispatch();

  const artists = useSelector((state: RootState) => state.artists, shallowEqual);

  useEffect(() => {
    dispatch(fetchArtists());
  }, []);

  if (!artists) {
    return <p>no artists found...</p>
  }

  return (
    <div className="App">
      <h1>Artists</h1>
      {
        artists && artists.map(artist => (
          <ArtistDetails key={artist.id} name={artist.name} genre={artist.genre} />
        ))
      }
    </div>
  );
}

export default App;
