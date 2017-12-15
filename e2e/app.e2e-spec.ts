import { TestAppCypressPage } from './app.po';

describe('test-app-cypress App', () => {
  let page: TestAppCypressPage;

  beforeEach(() => {
    page = new TestAppCypressPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
