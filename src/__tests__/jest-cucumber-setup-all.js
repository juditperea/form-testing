import { autoBindSteps, loadFeatures } from 'jest-cucumber'
import steps from './steps'
import React from 'react'
const features = loadFeatures('src/__tests__/features/*.feature', {
  tagFilter: 'not @skip and not @manual and not @ignore'
})
autoBindSteps(features, steps)
