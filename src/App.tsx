import React from "react";
import { useQuery } from "react-query";
import { fetchCharacters } from "./api";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

interface ICharacter {
  id: string;
  name: string;
  imageUrl: string;
}

const Loading = styled.div`
  margin: 30px;
  font-size: 30px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const Title = styled.h1`
  margin: 20px;
  font-size: 50px;
  font-weight: 700;
  text-align: center;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* display: flex;
  flex-direction: column;
  align-items: center; */
`;

const CharacterName = styled.div`
  color: ${(props) => props.theme.textColor};
  margin: 10px;
`;

const CharacterItem = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 200px;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: white;
    ${CharacterName} {
      color: ${(props) => props.theme.bgColor};
    }
  }
  border-radius: 15px;
`;

const CharacterImg = styled.img`
  margin: 10px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

function App() {
  const { isLoading, data: charactersData } = useQuery<ICharacter[]>(
    "allCharacters",
    fetchCharacters
  );
  console.log(charactersData);
  return (
    <>
      <Title>Disney Characters</Title>
      <Container>
        {isLoading ? (
          <Loading>Loading...</Loading>
        ) : (
          <>
            {charactersData?.slice(0, 100).map((character) => (
              <StyledLink to={`character/${character.id}`}>
                <CharacterItem>
                  <CharacterImg src={character.imageUrl} />
                  <CharacterName>{character.name}</CharacterName>
                </CharacterItem>
              </StyledLink>
            ))}
          </>
        )}
      </Container>
    </>
  );
}

export default App;
