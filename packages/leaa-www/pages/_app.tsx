import React, { ErrorInfo } from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';

import { IPageProps } from '@leaa/www/interfaces';
import { withApolloClient } from '@leaa/www/libs/with-apollo-client.lib';
import { MasterLayout } from '@leaa/www/components/MasterLayout';
import { ProgressLoading } from '@leaa/www/components/ProgressLoading';
import { initStore, StoreProvider } from '@leaa/www/stores';

const store = initStore();

class CustomApp extends App<IPageProps> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('CUSTOM ERROR HANDLING', error);

    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    return (
      <ApolloProvider client={this.props.apolloClient}>
        <StoreProvider value={store}>
          <ProgressLoading showAfterMs={100} />

          <MasterLayout {...this.props}>
            <this.props.Component {...this.props} />
          </MasterLayout>
        </StoreProvider>
      </ApolloProvider>
    );
  }
}

export default withApolloClient(CustomApp);
