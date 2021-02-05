import React from 'react';
import styled from 'styled-components';
import Span from '../atoms/Span';

const Article = styled.div<any>`
  key: ${props => props.index};
  padding-left: 312px;
  padding-bottom: 20px;
`;

const ProjectList = (props: any) => {
  const articles = props.articles;

  return (
    <div style={{ width: '100%' }}>
      {articles?.map((article: any, index: any) => (
        <Article key={index} paddingLeft="312px" paddingBottom="20px">
          <Span text={article.atitle}></Span>
        </Article>
      ))}
    </div>
  );
};

export default ProjectList;
