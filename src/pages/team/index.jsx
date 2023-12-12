import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

export default function Homepage(props) {
  return (
    <Layout
      title="团队🚀"
      wrapperClassName="homepage flex flex-col"
      noFooter
    >
      <Head>
        <link rel="prefetch" href="/assets/css/elements.min.css" />
      </Head>
      <div>team</div>
    </Layout>
  );
}
