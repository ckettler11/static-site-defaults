import { DocumentRenderer } from "@keystone-6/document-renderer"
import { componentBlockRenderers } from "./blocks/renderers"


export const Body = ({document}) => {
  return !!document ? <div id='page-content' className='nav-space min-h-screen scheme-colors content'>  
    <DocumentRenderer 
      {...{document}} 
      componentBlocks={componentBlockRenderers}
    />
  </div> : <></>
}