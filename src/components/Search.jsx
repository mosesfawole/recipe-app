import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/searched/${input}`);
  };
  return (
    <FormStyle onSubmit={handleSubmit}>
      <div>
        <FaSearch />
        <input
          placeholder="Search for recipes"
          value={input}
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
    </FormStyle>
  );
}
const FormStyle = styled.form`
  div {
    width: 100%;
    position: relative;
  }
  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.2rem;
    padding: 1rem 3rem;
    border-radius: 1rem;
    outline: none;
    width: 100%;
    color: white;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
    color: white;
  }
`;

export default Search;
