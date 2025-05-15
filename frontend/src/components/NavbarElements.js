import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: #ffffff;
  max-width: 70%;
  height: 85px;
  text-align: center;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 12;
  box-shadow: 2px 4px 10px 2px rgba(0, 0, 0, 0.5);
  margin-left: auto;
  margin-right: auto;
  align-items: stretch;
  border-radius: 8px;

`;

export const NavLink = styled(Link)`
  color: blue;
  display: flex;
  padding: 10px;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  align-self: stretch;
  transition: background-color 0.3s, color 0.3s;

  &.active {
    color: #4d4dff;
  }

  &:hover {
    background-color: #4d4dff;
    color: #ffffff;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #808080;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavButton = styled.button`
  background: none;
  border: none;
  color: blue;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-size: 1rem;

  &:hover {
    background-color: #4d4dff;
    color: #ffffff;
  }
`;
