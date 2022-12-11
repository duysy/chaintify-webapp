import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props: any) => (
  <ContentLoader speed={2} width={1010} height={600} viewBox="0 0 1010 600" backgroundColor="#d6d6d6" foregroundColor="#ecebeb" {...props}>
    <path d="M 20.278 25.56 h 251.67 v 32.223 H 20.278 z" />
    <rect x="20" y="81" rx="20" ry="20" width="198" height="198" />
    <path d="M 20.278 288.333 h 197.778 v 41.111 H 20.278 z" />
    <rect x="20" y="81" rx="20" ry="20" width="198" height="198" />
    <path d="M 20.278 288.333 h 197.778 v 41.111 H 20.278 z" />
    <rect x="20" y="81" rx="20" ry="20" width="198" height="198" />
    <path d="M 20.278 288.333 h 197.778 v 41.111 H 20.278 z" />
    <rect x="251" y="81" rx="20" ry="20" width="198" height="198" />
    <path d="M 251.389 288.333 h 197.778 v 41.111 H 251.389 z" />
    <rect x="483" y="81" rx="20" ry="20" width="198" height="198" />
    <path d="M 482.5 288.333 h 197.778 v 41.111 H 482.5 z" />
    <rect x="717" y="81" rx="20" ry="20" width="198" height="198" />
    <path d="M 716.944 288.333 h 197.778 v 41.111 H 716.944 z" />
  </ContentLoader>
);

export default MyLoader;
