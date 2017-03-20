import { MyAng2AppPage } from './app.po';

describe('my-ang2-app App', () => {
  let page: MyAng2AppPage;

  beforeEach(() => {
    page = new MyAng2AppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
