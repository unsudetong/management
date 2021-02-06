import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ArticleContents = (props: any): JSX.Element => {
  const curArticle = props.match.params.article_id;

  return (
    <div>
      <span>hello world.</span>
      <span>this is {curArticle}</span>
    </div>
  );
};

export default ArticleContents;
