import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { Link } from "react-router-dom";
function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api =
        await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9
        `);
      const data = await api.json();

      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
      console.log(data.recipes);
    }
    if (!check) {
      console.log("Can not fetch data");
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>

        <Splide
          options={{
            perPage: 3,
            arrows: false,
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
              rewind: true,
              speed: 0.8,
            },
          }}
          extensions={{ AutoScroll }}
        >
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
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
  /* min-height: 20rem; */
  overflow: hidden;
  position: relative;
  border-radius: 10%;
  /* display: grid; */
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
  font-family: "Courier New", Courier, monospace;

  img {
    /* height: 250px;
    width: 250px;
    position: absolute;
    /* left: 0; */
    /* width: 100%;
    height: 100%; */
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    bottom: 0%;
    transform: translate(-50, 0%);
    color: white;
    width: 100%;
    background: black;
    font-weight: 600;
    font-size: 1rem;
    /* height: 40%; */
    display: flex;
    padding: 5px;

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
export default Popular;
