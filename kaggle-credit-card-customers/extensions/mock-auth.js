const { BaseAuthenticator } = require('@vulcan-sql/serve');

class MockAuthenticator extends BaseAuthenticator {
  async authCredential(ctx) {
    const { users } = this.getOptions();
    return {
      status: 'SUCCESS',
      type: this.getExtensionId(),
      user: users.find(user => user.name === ctx.request.query['user']) || users[0]
    }
  }
}


Reflect.defineMetadata(Symbol.for('extension-id'), 'mock-auth', MockAuthenticator);

exports.MockAuthenticator = MockAuthenticator;