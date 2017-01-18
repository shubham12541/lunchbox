import { LunchboxPage } from './app.po';

describe('lunchbox App', function() {
  let page: LunchboxPage;

  beforeEach(() => {
    page = new LunchboxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
