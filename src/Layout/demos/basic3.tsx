import React from 'react';
// @ts-ignore
import { Layout, Header, Footer, Content, Sider } from 'banana-ui';

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
      <Layout>
        <Content
          style={{
            display: 'flex',
            background: '#1f90e6',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
          }}
        >
          content
        </Content>
        <Sider
          style={{
            display: 'flex',
            background: '#41a2e6',
            width: 100,
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
          }}
        >
          sider
        </Sider>
      </Layout>
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
