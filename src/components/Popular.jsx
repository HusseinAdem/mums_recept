import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");

    if (check && check !== 'undefined') {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
      );
      const data = await api.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };


  const displayedRecipes = popular.slice(0, 4);

  return (
    <Wrapper>
      <h3>Popular Picks</h3>
      <Grid>
        {displayedRecipes.map(recipe => (
          <Card key={recipe.id}>
            <Link to={"/recipe/" + recipe.id}>
              <img src={recipe.image} alt={recipe.title} />
              <p>{recipe.title}</p>
              <Gradient />
            </Link>
          </Card>
        ))}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  grid-gap: 1rem;

  @media(min-width: 768px) {
    grid-template-columns: repeat(4, 1fr); 
  }
`;

const Card = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  padding-top: 100%;

  img {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
  }

  p {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0.5rem;
    margin: 0;
    color: white;
    font-weight: 600;
    text-align: center;
    background: rgba(0,0,0,0.4);
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    z-index: 10;
  }

  p {
  
  font-size: 1rem;

  @media (max-width: 480px) {
    font-size: 0.6rem; 
  }
}

`;

const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(transparent, rgba(0,0,0,0.5));
  z-index: 5;
`;

export default Popular;
