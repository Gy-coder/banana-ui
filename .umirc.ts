import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'banana-ui',
  favicon: 'https://ae01.alicdn.com/kf/H13a5893e37234fde800a21a41fa0c23d3.jpg',
  logo: 'https://ae01.alicdn.com/kf/H13a5893e37234fde800a21a41fa0c23d3.jpg',
  outputPath: 'docs-dist',
  mode: 'site',
  sass: {},
  publicPath: process.env.PUBLIC_PATH ?? '/',
  // more config: https://d.umijs.org/config
});
