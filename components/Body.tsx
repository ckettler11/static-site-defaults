import { DocumentRenderer } from "@keystone-6/document-renderer"
import { componentBlockRenderers } from "./blocks/renderers"


export const Body = ({document}) => {
  return <div className=''>  
    <DocumentRenderer 
      {...{document}} 
      componentBlocks={componentBlockRenderers}
    />
  </div>
}