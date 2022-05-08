import { NotEditable, component, fields, ComponentBlock, } from '@keystone-6/fields-document/component-blocks';
import { ReactNode } from 'react';

export const quote: ComponentBlock = component({
  component: ({ attribution, content }) => {
    const c = content as ReactNode
    return <div>
      <div>
        {c}
      </div>
      <div>
        <>
          <NotEditable>— </NotEditable>
          {attribution}
        </>
      </div>
    </div>
  },
  label: 'Quote',
  props: {
    content: fields.child({
      kind: 'block',
      placeholder: 'Quote...',
      formatting: { inlineMarks: 'inherit', softBreaks: 'inherit' },
      links: 'inherit',
    }),
    attribution: fields.child({ kind: 'inline', placeholder: 'Attribution...' }),
  },
  chromeless: true,
})

export const quoteRenderer = props => {
  // props will be inferred from your component blocks
  return <div className='bg-neutral-50'>
    <h4 className='text-2xl'>{props.content}</h4>
    <span>– {props.attribution}</span>
  </div>
}