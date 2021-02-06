import React from 'react';
import Span from '../atoms/Span';
import Article from './Article';

const ProjectList = (props: any) => {
  const articles = props.articles;
  const trackUrl = props.trackUrl;

  return (
    <div style={{ width: '100%' }}>
      {articles?.map((article: any, index: any) => (
        <Article
          key={index}
          paddingLeft="312px"
          paddingBottom="20px"
          title={article.atitle}
          articleID={article.aid}
          trackUrl={trackUrl}
        ></Article>
      ))}
    </div>
  );
};

export default ProjectList;
