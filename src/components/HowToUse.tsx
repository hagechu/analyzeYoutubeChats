import React from "react";
import styled from "styled-components";

type ButtonAnnotationProps = {
  annotationContents: string;
};

export const ButtonAnnotation = (props: ButtonAnnotationProps) => {
  const { annotationContents } = props;

  return (
    <AnnotationCard>
      <p>{annotationContents}</p>
    </AnnotationCard>
  );
};

const AnnotationCard = styled.div`
  height: 32px;
  font-size: 16px;

  position: relative;
  top: 0;
`;
