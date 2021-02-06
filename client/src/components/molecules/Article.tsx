import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../atoms/Button';
import Span from '../atoms/Span';

const StyledArticle = styled.div<any>`
  key: ${props => props.index};
  padding-left: 312px;
  padding-bottom: 20px;
`;

const Article = (props: any) => {
  const title = props.title;
  const articleID = props.articleID;
  const trackUrl = props.trackUrl;

  return (
    <StyledArticle>
      <Link
        to={`${trackUrl}/articles/${articleID}`}
        style={{ fontSize: '30px' }}
      >
        <Button width="100%">
          <Span text={title} width="100%"></Span>
        </Button>
      </Link>
    </StyledArticle>
  );
};

export default Article;
