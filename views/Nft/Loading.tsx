import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={900}
    height={700}
    viewBox="0 0 900 700"
    backgroundColor="#d6d6d6"
    foregroundColor="#ecebeb"
    {...props}
  >
    <path d="M 8 46 h 307 v 26 H 8 z" /> 
    <rect x="10" y="100" rx="20" ry="20" width="137" height="136" /> 
    <path d="M 10 247 h 136 v 26 H 10 z" /> 
    <rect x="172" y="100" rx="20" ry="20" width="137" height="136" /> 
    <path d="M 172 247 h 136 v 26 H 172 z" /> 
    <rect x="336" y="100" rx="20" ry="20" width="137" height="136" /> 
    <path d="M 336 247 h 136 v 26 H 336 z" /> 
    <rect x="498" y="100" rx="20" ry="20" width="137" height="136" /> 
    <path d="M 498 247 h 136 v 26 H 498 z" /> 
    <rect x="663" y="100" rx="20" ry="20" width="137" height="136" /> 
    <path d="M 663 247 h 136 v 26 H 663 z" /> 
    <rect x="11" y="304" rx="20" ry="20" width="137" height="136" /> 
    <path d="M 11 451 h 136 v 26 H 11 z" /> 
    <rect x="173" y="304" rx="20" ry="20" width="137" height="136" /> 
    <path d="M 173 451 h 136 v 26 H 173 z" /> 
    <rect x="337" y="304" rx="20" ry="20" width="137" height="136" /> 
    <path d="M 337 451 h 136 v 26 H 337 z" /> 
    <rect x="499" y="304" rx="20" ry="20" width="137" height="136" /> 
    <path d="M 499 451 h 136 v 26 H 499 z" /> 
    <rect x="664" y="304" rx="20" ry="20" width="137" height="136" /> 
    <path d="M 664 451 h 136 v 26 H 664 z" />
  </ContentLoader>
)

export default MyLoader

