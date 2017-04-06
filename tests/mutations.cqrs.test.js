'use strict';

if (!global._babelPolyfill) require('babel-polyfill');
var R = require('ramda');
// var deref = require('json-schema-deref-sync')
// var faker = require('faker')
// var jsf = require('json-schema-faker')
// faker.locale = 'it'
// var restler = require('restler')
//
var t = require('tap');
var path = require('path');

var meta = {
  corrid: 'testRequest',
  userid: 'testUser'
};
var getConsole = function getConsole(serviceName, serviceId, pack) {
  return require("../utils").getConsole({ error: true, debug: true, log: true, warn: true }, serviceName, serviceId, pack);
};
var CONSOLE = getConsole('BASE TEST', '----', '-----');

var mutationsCqrs = require('../mutations.cqrs')({ getConsole: getConsole, mutationsPath: path.join(__dirname, 'mutations') });

t.test('*** MUTATIONS CQRS ***', {
  autoend: true
}, function mainTest(t) {
  return regeneratorRuntime.async(function mainTest$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          t.plan(2);
          _context3.next = 3;
          return regeneratorRuntime.awrap(new Promise(function (resolve) {
            return setTimeout(resolve, 1000);
          }));

        case 3:
          _context3.next = 5;
          return regeneratorRuntime.awrap(t.test('mutationsCqrs.mutate -> mutationState', function _callee(t) {
            var mutationState;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    mutationState = mutationsCqrs.mutate({ mutation: 'update', objId: 'testobjId', data: { testData: 1 }, meta: meta });
                    // mutationsCqrs.applyMutations()

                    CONSOLE.debug('mutationState', mutationState);
                    t.ok(mutationState.timestamp, 'mutationState.timestamp setted');
                    t.same(mutationState.version, '001', 'mutationState.version setted');
                    t.end();

                  case 5:
                  case 'end':
                    return _context.stop();
                }
              }
            }, null, this);
          }));

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap(t.test('mutationsCqrs.applyMutations -> state', function _callee2(t) {
            var mutations, state;
            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    mutations = [];

                    mutations.push(mutationsCqrs.mutate({ mutation: 'update', objId: 'testobjId', data: { testData: 1 }, meta: meta }));
                    mutations.push(mutationsCqrs.mutate({ mutation: 'update', objId: 'testobjId', data: { testData: 2 }, meta: meta }));
                    mutations.push(mutationsCqrs.mutate({ mutation: 'update', objId: 'testobjId', data: { testData2: 1 }, meta: meta }));
                    CONSOLE.debug('mutations', mutations);
                    _context2.next = 7;
                    return regeneratorRuntime.awrap(mutationsCqrs.applyMutations({ state: {}, mutations: mutations }));

                  case 7:
                    state = _context2.sent;

                    CONSOLE.debug('state', state);
                    t.equal(state.testData, 2, 'state.testData as expected');
                    t.equal(state.testData2, 1, 'state.testData2 as expected');
                    t.end();

                  case 12:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, null, this);
          }));

        case 7:
          //await new Promise((resolve) => setTimeout(resolve, 1000))
          t.end();
          process.exit();

        case 9:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, this);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm11dGF0aW9ucy5jcXJzLnRlc3QuZXM2Il0sIm5hbWVzIjpbImdsb2JhbCIsIl9iYWJlbFBvbHlmaWxsIiwicmVxdWlyZSIsIlIiLCJ0IiwicGF0aCIsIm1ldGEiLCJjb3JyaWQiLCJ1c2VyaWQiLCJnZXRDb25zb2xlIiwic2VydmljZU5hbWUiLCJzZXJ2aWNlSWQiLCJwYWNrIiwiZXJyb3IiLCJkZWJ1ZyIsImxvZyIsIndhcm4iLCJDT05TT0xFIiwibXV0YXRpb25zQ3FycyIsIm11dGF0aW9uc1BhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwidGVzdCIsImF1dG9lbmQiLCJtYWluVGVzdCIsInBsYW4iLCJQcm9taXNlIiwicmVzb2x2ZSIsInNldFRpbWVvdXQiLCJtdXRhdGlvblN0YXRlIiwibXV0YXRlIiwibXV0YXRpb24iLCJvYmpJZCIsImRhdGEiLCJ0ZXN0RGF0YSIsIm9rIiwidGltZXN0YW1wIiwic2FtZSIsInZlcnNpb24iLCJlbmQiLCJtdXRhdGlvbnMiLCJwdXNoIiwidGVzdERhdGEyIiwiYXBwbHlNdXRhdGlvbnMiLCJzdGF0ZSIsImVxdWFsIiwicHJvY2VzcyIsImV4aXQiXSwibWFwcGluZ3MiOiI7O0FBQ0EsSUFBSSxDQUFDQSxPQUFPQyxjQUFaLEVBQTJCQyxRQUFRLGdCQUFSO0FBQzNCLElBQUlDLElBQUlELFFBQVEsT0FBUixDQUFSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUUsSUFBSUYsUUFBUSxLQUFSLENBQVI7QUFDQSxJQUFJRyxPQUFPSCxRQUFRLE1BQVIsQ0FBWDs7QUFFQSxJQUFJSSxPQUFPO0FBQ1RDLFVBQVEsYUFEQztBQUVUQyxVQUFRO0FBRkMsQ0FBWDtBQUlBLElBQU1DLGFBQWEsU0FBYkEsVUFBYSxDQUFDQyxXQUFELEVBQWNDLFNBQWQsRUFBeUJDLElBQXpCO0FBQUEsU0FBa0NWLFFBQVEsVUFBUixFQUFvQk8sVUFBcEIsQ0FBK0IsRUFBQ0ksT0FBTyxJQUFSLEVBQWNDLE9BQU8sSUFBckIs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QUNBdEMsc0JBQUVtQyxHQUFGOztBQVZvRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUFoRCxDQWJMOztBQUFBO0FBeUJEO0FBQ0FuQyxZQUFFbUMsR0FBRjtBQUNBTyxrQkFBUUMsSUFBUjs7QUEzQkM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsQ0FGSCIsImZpbGUiOiJtdXRhdGlvbnMuY3Fycy50ZXN0LmVzNiIsInNvdXJjZXNDb250ZW50IjpbIlxuaWYgKCFnbG9iYWwuX2JhYmVsUG9seWZpbGwpcmVxdWlyZSgnYmFiZWwtcG9seWZpbGwnKVxudmFyIFIgPSByZXF1aXJlKCdyYW1kYScpXG4vLyB2YXIgZGVyZWYgPSByZXF1aXJlKCdqc29uLXNjaGVtYS1kZXJlZi1zeW5jJylcbi8vIHZhciBmYWtlciA9IHJlcXVpcmUoJ2Zha2VyJylcbi8vIHZhciBqc2YgPSByZXF1aXJlKCdqc29uLXNjaGVtYS1mYWtlcicpXG4vLyBmYWtlci5sb2NhbGUgPSAnaXQnXG4vLyB2YXIgcmVzdGxlciA9IHJlcXVpcmUoJ3Jlc3RsZXInKVxuLy9cbnZhciB0ID0gcmVxdWlyZSgndGFwJylcbnZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5cbnZhciBtZXRhID0ge1xuICBjb3JyaWQ6ICd0ZXN0UmVxdWVzdCcsXG4gIHVzZXJpZDogJ3Rlc3RVc2VyJ1xufVxuY29uc3QgZ2V0Q29uc29sZSA9IChzZXJ2aWNlTmFtZSwgc2VydmljZUlkLCBwYWNrKSA9PiByZXF1aXJlKFwiLi4vdXRpbHNcIikuZ2V0Q29uc29sZSh7ZXJyb3I6IHRydWUsIGRlYnVnOiB0cnVlLCBsb2c6IHRydWUsIHdhcm46IHRydWV9LCBzZXJ2aWNlTmFtZSwgc2VydmljZUlkLCBwYWNrKVxudmFyIENPTlNPTEUgPSBnZXRDb25zb2xlKCdCQVNFIFRFU1QnLCAnLS0tLScsICctLS0tLScpXG5cbnZhciBtdXRhdGlvbnNDcXJzID0gcmVxdWlyZSgnLi4vbXV0YXRpb25zLmNxcnMnKSh7Z2V0Q29uc29sZSwgbXV0YXRpb25zUGF0aDogcGF0aC5qb2luKF9fZGlybmFtZSwgJ211dGF0aW9ucycpfSlcblxudC50ZXN0KCcqKiogTVVUQVRJT05TIENRUlMgKioqJywge1xuICBhdXRvZW5kOiB0cnVlXG59LCBhc3luYyBmdW5jdGlvbiBtYWluVGVzdCAodCkge1xuICB0LnBsYW4oMilcbiAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpXG4gIC8vXG4gIGF3YWl0IHQudGVzdCgnbXV0YXRpb25zQ3Fycy5tdXRhdGUgLT4gbXV0YXRpb25TdGF0ZScsIGFzeW5jIGZ1bmN0aW9uICh0KSB7XG4gICAgdmFyIG11dGF0aW9uU3RhdGUgPSBtdXRhdGlvbnNDcXJzLm11dGF0ZSh7bXV0YXRpb246ICd1cGRhdGUnLCBvYmpJZDogJ3Rlc3RvYmpJZCcsIGRhdGE6IHt0ZXN0RGF0YTogMX0sIG1ldGF9KVxuICAgIC8vIG11dGF0aW9uc0NxcnMuYXBwbHlNdXRhdGlvbnMoKVxuICAgIENPTlNPTEUuZGVidWcoJ211dGF0aW9uU3RhdGUnLCBtdXRhdGlvblN0YXRlKVxuICAgIHQub2sobXV0YXRpb25TdGF0ZS50aW1lc3RhbXAsICdtdXRhdGlvblN0YXRlLnRpbWVzdGFtcCBzZXR0ZWQnKVxuICAgIHQuc2FtZShtdXRhdGlvblN0YXRlLnZlcnNpb24sICcwMDEnLCAnbXV0YXRpb25TdGF0ZS52ZXJzaW9uIHNldHRlZCcpXG4gICAgdC5lbmQoKVxuICB9KVxuICAvL1xuICBhd2FpdCB0LnRlc3QoJ211dGF0aW9uc0NxcnMuYXBwbHlNdXRhdGlvbnMgLT4gc3RhdGUnLCBhc3luYyBmdW5jdGlvbiAodCkge1xuICAgIHZhciBtdXRhdGlvbnMgPSBbXVxuICAgIG11dGF0aW9ucy5wdXNoKG11dGF0aW9uc0NxcnMubXV0YXRlKHttdXRhdGlvbjogJ3VwZGF0ZScsIG9iaklkOiAndGVzdG9iaklkJywgZGF0YToge3Rlc3REYXRhOiAxfSwgbWV0YX0pKVxuICAgIG11dGF0aW9ucy5wdXNoKG11dGF0aW9uc0NxcnMubXV0YXRlKHttdXRhdGlvbjogJ3VwZGF0ZScsIG9iaklkOiAndGVzdG9iaklkJywgZGF0YToge3Rlc3REYXRhOiAyfSwgbWV0YX0pKVxuICAgIG11dGF0aW9ucy5wdXNoKG11dGF0aW9uc0NxcnMubXV0YXRlKHttdXRhdGlvbjogJ3VwZGF0ZScsIG9iaklkOiAndGVzdG9iaklkJywgZGF0YToge3Rlc3REYXRhMjogMX0sIG1ldGF9KSlcbiAgICBDT05TT0xFLmRlYnVnKCdtdXRhdGlvbnMnLCBtdXRhdGlvbnMpXG4gICAgdmFyIHN0YXRlID0gYXdhaXQgbXV0YXRpb25zQ3Fycy5hcHBseU11dGF0aW9ucyh7c3RhdGU6IHt9LCBtdXRhdGlvbnN9KVxuICAgIENPTlNPTEUuZGVidWcoJ3N0YXRlJywgc3RhdGUpXG4gICAgdC5lcXVhbChzdGF0ZS50ZXN0RGF0YSwgMiwgJ3N0YXRlLnRlc3REYXRhIGFzIGV4cGVjdGVkJylcbiAgICB0LmVxdWFsKHN0YXRlLnRlc3REYXRhMiwgMSwgJ3N0YXRlLnRlc3REYXRhMiBhcyBleHBlY3RlZCcpXG4gICAgdC5lbmQoKVxuICB9KVxuICAvL2F3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApKVxuICB0LmVuZCgpXG4gIHByb2Nlc3MuZXhpdCgpXG59KVxuIl19