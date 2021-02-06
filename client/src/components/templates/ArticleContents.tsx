import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ArticleContents = (props: any): JSX.Element => {
  const curArticle = props.match.params.article_id;
  const [article, setArticle]: any = useState([]);

  const getArticle = () => {
    const cookie = localStorage.getItem('cookie');
    try {
      fetch(process.env.REACT_APP_SERVER_ADDRESS + `/articles/${curArticle}`, {
        method: 'GET',
        headers: {
          Authorization: cookie || '',
        },
      })
        .then(res => res.json())
        .then(res => setArticle(res.result));
    } catch (error) {
      throw new Error('authCheck error');
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <div>
      <h1>TITLE : {article.TITLE}</h1>
      <h2>CONTENTS : {article.CONTENTS}</h2>
    </div>
  );
};

export default ArticleContents;
