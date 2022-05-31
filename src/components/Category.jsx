import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
function Category() {
  return (
    <List>
      <SLink to={"/cuisine/Italian"}>
        <FaPizzaSlice />
        <h4>Italians</h4>
      </SLink>
      <SLink to={"/cuisine/American"}>
        <FaHamburger />
        <h4>Americans</h4>
      </SLink>
      <SLink to={"/cuisine/African"}>
        <GiNoodles />
        <h4>African</h4>
      </SLink>
      <SLink to={"/cuisine/Chinese"}>
        <GiChopsticks />
        <h4>Chinese</h4>
      </SLink>
    </List>
  );
}
const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem, 0rem;
`;

const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 2rem;
  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  transform: scale(0.8);
  :hover {
    background: linear-gradient(to right, #ae0ec2, #e94057);
    color: white;
    transition: all 0.3s ease-in-out;
  }
  @media (max-width: 768px) {
    margin-right: 0rem;
  }
  h4 {
    color: white;
    font-size: 0.8rem;
  }
  svg {
    color: white;
    font-size: 1.5rem;
  }
  &.active {
    background: linear-gradient(to right, #ae0ec2, #e94057);
    h4 {
      color: white;
    }
    svg {
      color: white;
    }
  }
`;

export default Category;
