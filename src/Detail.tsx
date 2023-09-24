import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { fetchDetails } from "./api";
import { styled } from "styled-components";

interface DisneyCharacter {
  id: number;
  films: string[];
  name: string;
  imageUrl: string;
  sourceUrl: string;
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 30px;
  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const Loading = styled.div`
  margin: 30px;
  font-size: 30px;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CharacterItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CharacterImg = styled.img`
  margin: 10px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const CharacterName = styled.div`
  color: ${(props) => props.theme.textColor};
  margin: 10px;
`;

const CharacterFilms = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CharacterFilm = styled.span`
  border-radius: 5px;
  background-color: white;
  padding: 5px;
  margin: 5px;
  color: ${(props) => props.theme.bgColor};
`;

function Detail() {
  const { id } = useParams();
  const { isLoading, data } = useQuery<DisneyCharacter>(
    ["characterId", id],
    () => fetchDetails(id)
  );
  console.log(id);
  return (
    <Container>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <CharacterItem>
          <StyledLink to="/">&larr;</StyledLink>
          <CharacterImg src={data?.imageUrl} />
          <CharacterName>{data?.name}'s Films'</CharacterName>
          <CharacterFilms>
            {data?.films.map((film) => (
              <CharacterFilm>{film}</CharacterFilm>
            ))}
          </CharacterFilms>
        </CharacterItem>
      )}
    </Container>
  );
}

export default Detail;
