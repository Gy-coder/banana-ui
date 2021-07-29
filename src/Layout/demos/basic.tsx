import React from 'react';
// @ts-ignore
import { Layout, Header, Footer, Content } from 'banana-ui';

const Demo = () => {
  return (
    <Layout style={{ height: 500 }}>
      <Header
        style={{
          background: '#80bde8',
          height: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
      >
        header
      </Header>
      <Content
        style={{
          background: '#1f90e6',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
      >
        content
      </Content>
      <Footer
        style={{
          background: '#80bde8',
          height: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
      >
        footer
      </Footer>
    </Layout>
  );
};

export default Demo;
