import styled from "styled-components";
export const Header = styled.h3`
  color: white;
  font-weight: 500;
  font-size: 1.4rem;
  text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
`;
export const Container = styled.div`
  background: red;
  width: ${(props) => (props.inForm ? "600px" : "70%")};
  max-width: 900px;
  margin: 0 auto;
  padding: 5px 20px;
  border-radius: 5px;
  background: ${(props) =>
    props.inForm ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.3)"};
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

export const Card = styled.div``;
