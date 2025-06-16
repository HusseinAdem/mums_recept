import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import React from "react";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const detailData = await data.json();
      setDetails(detailData);
    };
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instruction
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>

        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}

        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients &&
              details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

const Info = styled.div``;

const DetailWrapper = styled.div`
  margin-top: 6rem;
  margin-bottom: 3rem;
  display: flex;
  gap: 1.5rem;

  
  @media (min-width: 1024px) {
    flex-direction: row;

    div:first-child {
      flex: 1;

      img {
        width: 100%;
        max-width: 600px;
        border-radius: 1rem;
        object-fit: cover;
      }
    }

    ${Info} {
      flex: 1;
      margin-left: 6rem;
    }

    h2 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1rem;
      line-height: 1.3;
      margin-bottom: 0.8rem;
    }

    li {
      font-size: 0.9rem;
      line-height: 1.3;
      margin-bottom: 0.6rem;
    }
  }

  
  @media (max-width: 1023px) {
    flex-direction: column;

    div:first-child {
      img {
        width: 100%;
        max-width: none;
        border-radius: 1rem;
        object-fit: cover;
      }
    }

    ${Info} {
      margin-left: 0;
      margin-top: 1.5rem;
    }

    
    h2 {
      font-size: 1.4rem;
      margin-bottom: 0.8rem;
    }

    h3 {
      font-size: 0.85rem;
      line-height: 1.2;
      margin-bottom: 0.6rem;
    }

    li {
      font-size: 0.8rem;
      line-height: 1.2;
      margin-bottom: 0.5rem;
    }
  }

  ul {
    margin-top: 1rem;
  }

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;

  &.active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
`;

export default Recipe;
