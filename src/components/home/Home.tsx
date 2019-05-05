import * as React from 'react';
import Page from '../common/Page'
import NavButton from '../common/NavButton';

export default () => {
  return (
    <Page title='PROJECT SHADE' tagline='A Digital "Enhancement" for Doronai Nui'>
      <NavButton text='AKUTANA' href='/map' />
      <NavButton text='THE CANISTER' href='/canister' />
      <NavButton text="CHRONICLER'S NOTES" href='/notes' />
      <NavButton text='RED STAR FORGE' href='https://www.shapeways.com/shops/forge-of-the-red-star' />
    </Page>
  );
}