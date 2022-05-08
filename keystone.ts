import { config, list } from '@keystone-6/core';
import { Attachment } from './lists/attachment';
import { Page } from './lists/page';

export default config({
  db: { provider: 'sqlite', url: 'file:./app.db' },
  experimental: {
    generateNextGraphqlAPI: true,
    generateNodeAPI: true,
  },
  lists: { Attachment, Page },
  images: {
    upload: 'local',
    local: {
      storagePath: 'public/images',
      baseUrl: '/images'
    }
  }
});