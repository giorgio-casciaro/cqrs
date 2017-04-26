
// if (!global._babelPolyfill)require('babel-polyfill')
var R = require('ramda')
// var deref = require('json-schema-deref-sync')
// var faker = require('faker')
// var jsf = require('json-schema-faker')
// faker.locale = 'it'
// var restler = require('restler')
//
var t = require('tap')
var co = require('co')
var path = require('path')

var meta = {
  corrid: 'testRequest',
  userid: 'testUser'
}
const getConsole = (serviceName, serviceId, pack) => require('../utils').getConsole({error: true, debug: true, log: true, warn: true}, serviceName, serviceId, pack)
var CONSOLE = getConsole('BASE TEST', '----', '-----')

var mutationsCqrs = require('../mutations')({getConsole, mutationsPath: path.join(__dirname, 'mutations')})

co(function* () {
  t.plan(4)
  yield new Promise((resolve) => setTimeout(resolve, 1000))

  var mutationState = mutationsCqrs.mutate({mutation: 'update', objId: 'testobjId', data: {testData: 1}, meta})
  // mutationsCqrs.applyMutations()
  CONSOLE.log('mutationState', mutationState)
  t.ok(mutationState.timestamp, 'mutationState.timestamp setted')
  t.same(mutationState.version, '001', 'mutationState.version setted')

  var mutations = []
  mutations.push(mutationsCqrs.mutate({mutation: 'update', objId: 'testobjId', data: {testData: 1}, meta}))
  mutations.push(mutationsCqrs.mutate({mutation: 'update', objId: 'testobjId', data: {testData: 2}, meta}))
  mutations.push(mutationsCqrs.mutate({mutation: 'update', objId: 'testobjId', data: {testData2: 1}, meta}))
  CONSOLE.log('mutations', mutations)
  var state = yield mutationsCqrs.applyMutations({}, mutations)
  CONSOLE.log('state', state)
  t.equal(state.testData, 2, 'state.testData as expected')
  t.equal(state.testData2, 1, 'state.testData2 as expected')

  t.end()
  process.exit()
})
