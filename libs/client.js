// https://github.com/microcmsio/microcms-js-sdk

import { createClient } from 'microcms-js-sdk'

export const client = createClient({
  //後で変更する
  serviceDomain: 'post-app',
  apiKey: process.env.NEXT_PUBLIC_API_KEY
})
