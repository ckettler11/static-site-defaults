import { NotEditable, component, fields, ComponentBlock, } from '@keystone-6/fields-document/component-blocks';
import { ReactNode } from 'react';
import { useSiteContext } from '../../lib/context';
import { ATTACHMENT_QUERY } from '../../lib/utils';

export const fullHeight: ComponentBlock = component({
  component: ({ content }) => {
    const c = content as ReactNode
    return <div>
      {c}
    </div>
  },
  label: 'Full Height Hero',
  props: {
    content: fields.child({
      kind: 'block',
      placeholder: 'Content',
      formatting: { inlineMarks: 'inherit', softBreaks: 'inherit', headingLevels: [1,2,3,4,5,6] },
      links: 'inherit',
    }),
    backgroundImage: fields.relationship({
      listKey: 'Attachment',
      label: 'Background Image',
      selection: ATTACHMENT_QUERY
    }),
  },
})

export const FullHeightRenderer = (props) => {
  // props will be inferred from your component blocks
  const { scheme } = useSiteContext()
  const url = scheme === 'dark' && !!props.backgroundImage?.data?.darkImage
  ? props.backgroundImage?.data?.darkImage?.url
  : props.backgroundImage?.data?.image?.url

  return <div 
    className='nav-space bg-neutral-50 min-h-screen px-8 md:px-12 flex flex-col justify-center' 
    style={{
      backgroundImage: `url(${url})`,
      backgroundSize: 'cover',
    }}
  >
    <div className='py-8 max-w-screen-md mx-auto w-full -mt-12 md:-mt-14 align-center text-center'>
      {props.content}
    </div>
  </div>
}