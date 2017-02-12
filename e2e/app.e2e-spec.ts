import { FlipPage } from './app.po';

describe('flip App', function() {
  let page: FlipPage;

  beforeEach(() => {
    page = new FlipPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
