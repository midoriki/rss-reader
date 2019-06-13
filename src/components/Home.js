import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { Layout } from 'antd';
import SourceSelector from '../containers/SelectSource';
import DisplayArticleList from '../containers/DisplayArticleList';
import DisplayArticle from '../containers/DisplayArticle';

const { Content, Sider } = Layout;

export default class Home extends React.Component {
  componentDidMount() {
    const { loadSources } = this.props;
    loadSources();
  }

  componentDidUpdate() {
    $('a').attr('target', '_blank');
  }

  render() {
    return (
      <Layout>
        <Sider
          theme="light"
          width={300}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <SourceSelector />
          <DisplayArticleList />
        </Sider>
        <Layout style={{ marginLeft: 300 }}>
          <Content style={{ height: '100%', overflow: 'initial' }}>
            <DisplayArticle />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

Home.defaultProps = {
  loadSources: () => console.log('Empty function'),
};

Home.propTypes = {
  loadSources: PropTypes.func,
};
