import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props:any) => (
  <ContentLoader 
    speed={2}
    width={1097}
    height={532}
    viewBox="0 0 1097 532"
    backgroundColor="#d6d6d6"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="38" y="77" rx="20" ry="20" width="325" height="325" /> 
    <path d="M 39 421 h 322 v 30 H 39 z M 39 465 h 322 v 30 H 39 z M 382.5 150 h 674 v 80 h -674 z M 382.5 20 h 385 v 21 h -385 z M 382.5 94 h 672 v 31 h -672 z M 382.5 251 h 674 v 80 h -674 z M 382.5 354 h 674 v 80 h -674 z" />
  </ContentLoader>
)

export default MyLoader

