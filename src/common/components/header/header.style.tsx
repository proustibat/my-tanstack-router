import styled from "styled-components";

export const StyledNav = styled.nav`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
    margin: 0 0 1rem 0;
    box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
    
    .active {
        color: black;
        text-decoration: none;
    }
`;