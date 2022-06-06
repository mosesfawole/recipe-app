import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { Link } from "react-router-dom";
function Veggie() {
  const [veggie, setVeggie] = useState([]);
  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const api =
      await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian
          `);
    const data = await api.json();

    setVeggie(data.recipes);
    console.log(data.recipes);
  };
  return (
    <div>
      <Wrapper>
        <h3>Our Vegetarian Picks</h3>
        <Splide
          options={{
            perPage: 3,
            arrows: true,
            pagination: false,
            drag: "free",
            gap: "5rem",
            type: "loop",
            breakpoints: {
              768: {
                perPage: 1,
              },
            },
            autoScroll: {
              pauseOnHover: true,
              pauseOnFocus: true,
              rewind: false,
              speed: 0.8,
            },
          }}
          extensions={{ AutoScroll }}
        >
          {veggie.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card className="card">
                  <Link to={`/recipe/${recipe.id}`}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}
const Wrapper = styled.div`
  margin: 4rem 0rem;
`;
const Card = styled.div`
  overflow: hidden;
  border-radius: 10%;
  position: relative;

  font-family: "Courier New", Courier, monospace;

  img {
    /* height: 250px;
    width: 250px;
    position: absolute;
    left: 0; */
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    bottom: 0%;
    transform: translate(-50, 0%);
    color: white;
    width: 100%;
    font-weight: 600;
    font-size: 1.1rem;
    background: #313131;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Veggie;
