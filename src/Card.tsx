import React from "react";
import { CardContainer } from "./styles";

interface CardProps {
  text: String;
}
const Card = ({ text }: CardProps) => {
  return <CardContainer>{text}</CardContainer>;
};

export default Card;
