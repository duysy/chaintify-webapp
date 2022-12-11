import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props: any) => (
  <ContentLoader speed={2} width={1111} height={600} viewBox="0 0 1111 600" backgroundColor="#d6d6d6" foregroundColor="#ecebeb" {...props}>
    <rect x="42" y="88" rx="20" ry="20" width="323" height="322" />
    <path d="M 390.611 26.111 h 671.667 v 21.667 H 390.611 z M 390.611 51.667 h 671.667 v 21.667 H 390.611 z M 390.611 82.778 h 671.667 v 50.555 H 390.611 z M 390.611 170.555 h 671.667 v 21.667 H 390.611 z M 390.611 199.444 h 671.667 v 21.667 H 390.611 z M 390.611 312.777 h 671.667 v 21.667 H 390.611 z M 390.611 342.777 h 671.667 v 21.667 H 390.611 z M 390.611 233.888 h 671.667 v 50.555 H 390.611 z M 390.611 372.777 h 671.667 v 50.555 H 390.611 z M 43.666 452.22 h 319.999 v 35.555 H 43.666 z" />
    <path d="M 43.666 452.22 h 319.999 v 35.555 H 43.666 z M 43.666 506.664 h 319.999 v 35.555 H 43.666 z" />
    <rect x="391" y="441" rx="7" ry="7" width="76" height="37" />
    <rect x="495" y="441" rx="7" ry="7" width="76" height="37" />
  </ContentLoader>
);

export default MyLoader;
