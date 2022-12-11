import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={900}
    height={1000}
    viewBox="0 0 900 1000"
    backgroundColor="#d6d6d6"
    foregroundColor="#ecebeb"
    {...props}
  >
    <path d="M 25.056 28.889 h 311.111 v 48.889 H 25.056 z M 25.056 107.778 h 311.111 v 35.556 H 25.056 z M 25.056 373.333 h 311.111 v 35.556 H 25.056 z" /> 
    <rect x="27" y="162" rx="100" ry="100" width="134" height="134" /> 
    <path d="M 25.056 303.73 H 163.31 v 25.556 H 25.056 z" /> 
    <rect x="25" y="429" rx="20" ry="20" width="142" height="142" /> 
    <path d="M 27.04 588.731 h 138.254 v 25.556 H 27.04 z" /> 
    <rect x="27" y="162" rx="100" ry="100" width="134" height="134" /> 
    <path d="M 25.056 303.73 H 163.31 v 25.556 H 25.056 z" /> 
    <rect x="27" y="162" rx="100" ry="100" width="134" height="134" /> 
    <path d="M 25.056 303.73 H 163.31 v 25.556 H 25.056 z" /> 
    <rect x="27" y="162" rx="100" ry="100" width="134" height="134" /> 
    <path d="M 25.056 303.73 H 163.31 v 25.556 H 25.056 z" /> 
    <rect x="203" y="162" rx="100" ry="100" width="134" height="134" /> 
    <path d="M 200.771 303.73 h 138.254 v 25.556 H 200.771 z" /> 
    <rect x="374" y="162" rx="100" ry="100" width="134" height="134" /> 
    <path d="M 372.2 303.73 h 138.254 v 25.556 H 372.2 z" /> 
    <rect x="554" y="162" rx="100" ry="100" width="134" height="134" /> 
    <path d="M 552.201 303.73 h 138.254 v 25.556 H 552.201 z" /> 
    <rect x="552" y="429" rx="20" ry="20" width="142" height="142" /> 
    <path d="M 554.185 588.731 h 138.254 v 25.556 H 554.185 z" /> 
    <rect x="376" y="429" rx="20" ry="20" width="142" height="142" /> 
    <path d="M 378.47 588.731 h 138.254 v 25.556 H 378.47 z" /> 
    <rect x="198" y="429" rx="20" ry="20" width="142" height="142" /> 
    <path d="M 199.898 588.731 h 138.254 v 25.556 H 199.898 z" /> 
    <path d="M 30.002 671.433 h 665.717 v 47.143 H 30.002 z M 30.002 750.005 h 665.717 v 47.143 H 30.002 z M 30.002 830.006 h 665.717 v 47.143 H 30.002 z M 30.002 907.149 h 665.717 v 47.143 H 30.002 z" />
  </ContentLoader>
)

export default MyLoader

