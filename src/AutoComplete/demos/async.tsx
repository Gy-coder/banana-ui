import React from 'react';
// @ts-ignore
import { AutoComplete, DataSourceType } from 'banana-ui';

interface GithubUserProps {
  login: string;
  url: string;
  // eslint-disable-next-line camelcase
  avatar_url: string;
}

const Demo = () => {
  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>;
    return (
      <>
        <b>Name: {itemWithGithub.value}</b>
        <span>url: {itemWithGithub.url}</span>
      </>
    );
  };
  const handleSearch = (query: string) =>
    fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        if (typeof items !== 'undefined') {
          return items
            .slice(0, 10)
            .map((item: any) => ({ value: item.login, ...item }));
        }
        return [];
      });

  return (
    <div>
      <div>请输入任意 Github 用户名</div>
      <AutoComplete
        fetchSuggestions={handleSearch}
        renderOption={renderOption}
      />
    </div>
  );
};

export default Demo;
