import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props: any) => (
  <ContentLoader speed={1} width={800} height={1200} viewBox="0 0 800 1200" backgroundColor="#f3f3f3" foregroundColor="#ecebeb" {...props}>
    <path d="M 24.723 18.921 h 205 v 32.292 h -205 z M 24.723 81.563 h 93.334 v 25 H 24.723 z" />
    <rect x="25" y="325" rx="20" ry="20" width="140" height="140" />
    <rect x="193" y="325" rx="20" ry="20" width="140" height="140" />
    <path d="M 28.359 286.734 h 93.334 v 25 H 28.359 z" />
    <path d="M 417.169 354.753 h 13.178 v 79.845 h -13.178 z" />
    <path d="M 385.386 390.025 h 76.744 v 9.302 h -76.744 z" />
    <rect x="354" y="325" rx="20" ry="20" width="140" height="140" />
    <rect x="517" y="127" rx="100" ry="100" width="140" height="140" />
    <rect x="25" y="127" rx="100" ry="100" width="140" height="140" />
    <rect x="193" y="127" rx="100" ry="100" width="140" height="140" />
    <rect x="354" y="127" rx="100" ry="100" width="140" height="140" />
    <path d="M 24.723 497.926 h 93.334 v 25 H 24.723 z" />
    <path d="M 24.723 497.926 h 93.334 v 25 H 24.723 z" />
    <rect x="63" y="545" rx="20" ry="20" width="140" height="44" />
    <rect x="214" y="545" rx="20" ry="20" width="140" height="44" />
    <rect x="27" y="623" rx="10" ry="10" width="750" height="61" />
    <rect x="27" y="709" rx="10" ry="10" width="750" height="61" />
    <rect x="27" y="793" rx="10" ry="10" width="750" height="61" />
    <rect x="27" y="876" rx="10" ry="10" width="750" height="61" />
  </ContentLoader>
);

export default MyLoader;
