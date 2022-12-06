import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props: any) => (
  <ContentLoader speed={1} width="100%" height="100%" viewBox="0 0 800 600" backgroundColor="#f3f3f3" foregroundColor="#ecebeb" {...props}>
    <rect x="27" y="62" rx="10" ry="10" width="166" height="163" />
    <path d="M 27.25 248 h 166 v 24 h -166 z" />
    <rect x="225" y="62" rx="10" ry="10" width="166" height="163" />
    <path d="M 225.25 248 h 166 v 24 h -166 z" />
    <rect x="424" y="62" rx="10" ry="10" width="166" height="163" />
    <path d="M 424.25 248 h 166 v 24 h -166 z" />
  </ContentLoader>
);

export default MyLoader;
