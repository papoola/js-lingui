// @flow
import { transformFileSync } from "babel-core"

import linguiTransformJs from "babel-plugin-lingui-transform-js"
import linguiTransformReact from "babel-plugin-lingui-transform-react"
import linguiExtractMessages from "babel-plugin-lingui-extract-messages"

import type { ExtractorType } from "./types"

const babelRe = /\.jsx?$/i

const extractor: ExtractorType = {
  match(filename) {
    return babelRe.test(filename)
  },

  extract(filename, localeDir) {
    transformFileSync(filename, {
      plugins: [
        // Plugins run before presets, so we need to import trasnform-plugins
        // here until we have a better way to run extract-messages plugin
        // *after* all plugins/presets.
        // Transform plugins are idempotent, so they can run twice.
        linguiTransformJs,
        linguiTransformReact,
        [linguiExtractMessages, { localeDir }]
      ]
    })
  }
}

export default extractor
