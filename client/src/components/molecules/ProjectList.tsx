import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProjectList = (props: any) => {
  const [articles, setArticles] = useState([]);
  const PROJECT_ID = props.projectNum;
  const cookie = localStorage.getItem('cookie');

  const getArticlesOfProject = () => {
    const myHeader = new Headers();
    try {
      fetch(process.env.REACT_APP_SERVER_ADDRESS + `/articles/${PROJECT_ID}`, {
        method: 'GET',
        headers: {
          Authorization: cookie || '',
        },
      })
        .then(res => res.json())
        .then(res => {
          setArticles(res.result);
        });
    } catch (error) {
      throw new Error('authCheck error');
    }
  };

  useEffect(() => {
    getArticlesOfProject();
  }, []);

  return (
    <div style={{ width: '100%' }}>
      {articles?.map((article: any, index) => (
        <div
          key={index}
          style={{ paddingLeft: '312px', paddingBottom: '20px' }}
        >
          {article.TITLE}
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
