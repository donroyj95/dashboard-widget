import styled from "styled-components";

export const NewsList = styled.div`
  max-width: 500px;
  max-height: 500px;
  border: solid;
  overflow: auto;
  background: white;
  color: grey;
`;

export const NewsCard = styled.div`
  margin: 5px;
`;

export const Divider = styled.hr`
  border-top: 3px solid #bbb;
`;

export const Link = styled.a`
  text-decoration: unset !important;
`;

export const NewsCategorySelect = styled.select`
  width: -webkit-fill-available;
  height: 25px;
  border-radius: 5px;
  font-size: 20px;
  margin-bottom: 15px;
`;
