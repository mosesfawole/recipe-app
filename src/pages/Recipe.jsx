import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
function Recipe() {
  let params = useParams();

  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information/?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const dataDetail = await data.json();
    setDetails(dataDetail);
    console.log(dataDetail);
  };

  useEffect(() => {
    fetchDetails(params.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <p
              className="summary"
              dangerouslySetInnerHTML={{ __html: details.summary }}
            ></p>
            <p
              className="instructions"
              dangerouslySetInnerHTML={{ __html: details.instructions }}
            ></p>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
    transition: all 0.4s ease-in-out;
  }
  @media (max-width: 768px) {
    display: block;
    margin-top: 1rem;
    img {
      width: 100%;
    }
  }
  h2 {
    margin-bottom: 2rem;
    li {
      font-size: 1.2rem;
      line-height: 2.5rem;
    }
    ul {
      margin-top: 2rem;
    }
  }
`;
const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    margin-right: 0rem;
  }
`;
const Info = styled.div`
  margin-left: 10rem;

  @media (max-width: 768px) {
    margin-left: 0rem;
    img {
      width: 100%;
    }
  }
`;
export default Recipe;
