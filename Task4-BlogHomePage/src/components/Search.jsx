import React from 'react';
import styled from 'styled-components';
const Search = () => {

  
  return (
    <StyledWrapper>
      <input placeholder="Search Blogs" type="text" name="text" className="input" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .input {
    margin-top: 5px;
    width: 100%;
    max-width: 220px;
    height: 20px;
    padding: 6px 8px;
    border-radius: 32px;
    background-color: var(--box-color);
    border: 1.5px solid lightgrey;
    outline: none;
    transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
    box-shadow: 0px 0px 20px -18px;
  }

  .input:hover {
    border: 2px solid lightgrey;
    box-shadow: 0px 0px 20px -17px;
  }

  .input:active {
    transform: scale(0.95);
  }

  .input:focus {
    border: 2px solid var(--accent-color);
  }`;

export default Search;