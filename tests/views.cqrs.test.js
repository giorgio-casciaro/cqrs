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

// var jesus = require('../jesus')
var meta = {
  corrid: 'testRequest',
  userid: 'testUser'
};
var getConsole = function getConsole(serviceName, serviceId, pack) {
  return require("../utils").getConsole({ error: true, debug: true, log: true, warn: true }, serviceName, serviceId, pack);
};
var CONSOLE = getConsole('BASE TEST', '----', '-----');

var mutationsCqrs = require('../mutations.cqrs')({ getConsole: getConsole, mutationsPath: path.join(__dirname, 'mutations') });

t.test('*** VIEWS CQRS ***', {
  autoend: true
}, function mainTest(t) {
  return regeneratorRuntime.async(function mainTest$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          t.plan(1);
          _context3.next = 3;
          return regeneratorRuntime.awrap(new Promise(function (resolve) {
            return setTimeout(resolve, 1000);
          }));

        case 3:
          _context3.next = 5;
          return regeneratorRuntime.awrap(t.test('mutationsCqrs.mutate -> mutationState', function _callee2(t) {
            var _this = this;

            var mutations, getObjMutations, applyMutations, viewsCqrs, addMutations, viewState;
            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    mutations = [];

                    mutations.push(mutationsCqrs.mutate({ mutation: 'update', objId: 'testobjId', data: { testData: 1 }, meta: meta }));
                    mutations.push(mutationsCqrs.mutate({ mutation: 'update', objId: 'testobjId', data: { testData2: 1 }, meta: meta }));

                    getObjMutations = function _callee() {
                      return regeneratorRuntime.async(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              return _context.abrupt('return', mutations);

                            case 1:
                            case 'end':
                              return _context.stop();
                          }
                        }
                      }, null, _this);
                    };

                    applyMutations = mutationsCqrs.applyMutations;
                    viewsCqrs = require('../views.cqrs')({ getConsole: getConsole, snapshotsMaxMutations: 10, getObjMutations: getObjMutations, applyMutations: applyMutations });
                    addMutations = [mutations[1], mutationsCqrs.mutate({ mutation: 'update', objId: 'testobjId', data: { testData: 2 }, meta: meta })];
                    _context2.next = 9;
                    return regeneratorRuntime.awrap(viewsCqrs.refreshViews({ objIds: ['testobjId'], loadMutations: true, addMutations: addMutations }));

                  case 9:
                    viewState = _context2.sent;

                    // mutationsCqrs.applyMutations()
                    CONSOLE.debug('viewState', viewState);
                    // t.ok(viewState.timestamp, 'mutationState.timestamp setted')
                    // t.same(viewState.version, '001', 'mutationState.version setted')
                    t.end();

                  case 12:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, null, this);
          }));

        case 5:

          // await new Promise((resolve) => setTimeout(resolve, 10000))
          t.end();
          process.exit();

        case 7:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, this);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzLmNxcnMudGVzdC5lczYiXSwibmFtZXMiOlsiZ2xvYmFsIiwiX2JhYmVsUG9seWZpbGwiLCJyZXF1aXJlIiwiUiIsInQiLCJwYXRoIiwibWV0YSIsImNvcnJpZCIsInVzZXJpZCIsImdldENvbnNvbGUiLCJzZXJ2aWNlTmFtZSIsInNlcnZpY2VJZCIsInBhY2siLCJlcnJvciIsImRlYnVnIiwibG9nIiwid2FybiIsIkNPTlNPTEUiLCJtdXRhdGlvbnNDcXJzIiwibXV0YXRpb25zUGF0aCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJ0ZXN0IiwiYXV0b2VuZCIsIm1haW5UZXN0IiwicGxhbiIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsIm11dGF0aW9ucyIsInB1c2giLCJtdXRhdGUiLCJtdXRhdGlvbiIsIm9iaklkIiwiZGF0YSIsInRlc3REYXRhIiwidGVzdERhdGEyIiwiZ2V0T2JqTXV0YXRpb25zIiwiYXBwbHlNdXRhdGlvbnMiLCJ2aWV3c0NxcnMiLCJzbmFwc2hvdHNNYXhNdXRhdGlvbnMiLCJhZGRNdXRhdGlvbnMiLCJyZWZyZXNoVmlld3MiLCJvYmpJZHMiLCJsb2FkTXV0YXRpb25zIiwidmlld1N0YXRlIiwiZW5kIiwicHJvY2VzcyIsImV4aXQiXSwibWFwcGluZ3MiOiI7O0FBQ0EsSUFBSSxDQUFDQSxPQUFPQyxjQUFaLEVBQTJCQyxRQUFRLGdCQUFSO0FBQzNCLElBQUlDLElBQUlELFFBQVEsT0FBUixDQUFSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUUsSUFBSUYsUUFBUSxLQUFSLENBQVI7QUFDQSxJQUFJRyxPQUFPSCxRQUFRLE1BQVIsQ0FBWDs7QUFFQTtBQUNBLElBQUlJLE9BQU87QUFDVEMsVUFBUSxhQURDO0FBRVRDLFVBQVE7QUFGQyxDQUFYO0FBSUEsSUFBTUMsYUFBYSxTQUFiQSxVQUFhLENBQUNDLFdBQUQsRUFBY0MsU0FBZCxFQUF5QkMsSUFBekI7QUFBQSxTQUFrQ1YsUUFBUSxVQUFSLEVBQW9CTyxVQUFwQixDQUErQixFQUFDSSxPQUFPLElBQVIsRUFBY0MsT0FBTyxJQUFyQixFQUEyQkMsS0FBSyxJQUFoQyxFQUFzQ0MsTUFBTSxJQUE1QyxFQUEvQixFQUFrRk4sV0FBbEYsRUFBK0ZDLFNBQS9GLEVBQTBHQyxJQUExRyxDQUFsQztBQUFBLENBQW5CO0FBQ0EsSUFBSUssVUFBVVIsV0FBVyxXQUFYLEVBQXdCLE1BQXhCLEVBQWdDLE9BQWhDLENBQWQ7O0FBRUEsSUFBSVMsZ0JBQWdCaEIsUUFBUSxtQkFBUixFQUE2QixFQUFDTyxzQkFBRCxFQUFhVSxlQUFlZCxLQUFLZSxJQUFMLENBQVVDLFNBQVYsRUFBcUIsV0FBckIsQ0FBNUIsRUFBN0IsQ0FBcEI7O0FBRUFqQixFQUFFa0IsSUFBRixDQUFPLG9CQUFQLEVBQTZCO0FBQzNCQyxXQUFTO0FBRGtCLENBQTdCLEVBRUcsU0FBZUMsUUFBZixDQUF5QnBCLENBQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDREEsWUFBRXFCLElBQUYsQ0FBTyxDQUFQO0FBREM7QUFBQSwwQ0FFSyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRDtBQUFBLG1CQUFhQyxXQUFXRCxPQUFYLEVBQW9CLElBQXBCLENBQWI7QUFBQSxXQUFaLENBRkw7O0FBQUE7QUFBQTtBQUFBLDBDQUlLdkIsRUFBRWtCLElBQUYsQ0FBTyx1Q0FBUCxFQUFnRCxrQkFBZ0JsQixDQUFoQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDaER5Qiw2QkFEZ0QsR0FDcEMsRUFEb0M7O0FBRXBEQSw4QkFBVUMsSUFBVixDQUFlWixjQUFjYSxNQUFkLENBQXFCLEVBQUNDLFVBQVUsUUFBWCxFQUFxQkMsT0FBTyxXQUE1QixFQUF5Q0MsTUFBTSxFQUFDQyxVQUFVLENBQVgsRUFBL0MsRUFBOEQ3QixVQUE5RCxFQUFyQixDQUFmO0FBQ0F1Qiw4QkFBVUMsSUFBVixDQUFlWixjQUFjYSxNQUFkLENBQXFCLEVBQUNDLFVBQVUsUUFBWCxFQUFxQkMsT0FBTyxXQUE1QixFQUF5Q0MsTUFBTSxFQUFDRSxXQUFXLENBQVosRUFBL0MsRUFBK0Q5QixVQUEvRCxFQUFyQixDQUFmOztBQUVJK0IsbUNBTGdELEdBSzlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwrREFDYlIsU0FEYTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFMOEI7O0FBU2hEUyxrQ0FUZ0QsR0FTL0JwQixjQUFjb0IsY0FUaUI7QUFVaERDLDZCQVZnRCxHQVVwQ3JDLFFBQVEsZUFBUixFQUF5QixFQUFDTyxzQkFBRCxFQUFhK0IsdUJBQXVCLEVBQXBDLEVBQXdDSCxnQ0FBeEMsRUFBeURDLDhCQUF6RCxFQUF6QixDQVZvQztBQVdoREcsZ0NBWGdELEdBV2pDLENBQUNaLFVBQVUsQ0FBVixDQUFELEVBQWVYLGNBQWNhLE1BQWQsQ0FBcUIsRUFBQ0MsVUFBVSxRQUFYLEVBQXFCQyxPQUFPLFdBQTVCLEVBQXlDQyxNQUFNLEVBQUNDLFVBQVUsQ0FBWCxFQUEvQyxFQUE4RDdCLFVBQTlELEVBQXJCLENBQWYsQ0FYaUM7QUFBQTtBQUFBLG9EQVk5QmlDLFVBQVVHLFlBQVYsQ0FBdUIsRUFBQ0MsUUFBUSxDQUFDLFdBQUQsQ0FBVCxFQUF3QkMsZUFBZSxJQUF2QyxFQUE2Q0gsMEJBQTdDLEVBQXZCLENBWjhCOztBQUFBO0FBWWhESSw2QkFaZ0Q7O0FBYXBEO0FBQ0E1Qiw0QkFBUUgsS0FBUixDQUFjLFdBQWQsRUFBMkIrQixTQUEzQjtBQUNBO0FBQ0E7QUFDQXpDLHNCQUFFMEMsR0FBRjs7QUFqQm9EO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQWhELENBSkw7O0FBQUE7O0FBd0JEO0FBQ0ExQyxZQUFFMEMsR0FBRjtBQUNBQyxrQkFBUUMsSUFBUjs7QUExQkM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsQ0FGSCIsImZpbGUiOiJ2aWV3cy5jcXJzLnRlc3QuZXM2Iiwic291cmNlc0NvbnRlbnQiOlsiXG5pZiAoIWdsb2JhbC5fYmFiZWxQb2x5ZmlsbClyZXF1aXJlKCdiYWJlbC1wb2x5ZmlsbCcpXG52YXIgUiA9IHJlcXVpcmUoJ3JhbWRhJylcbi8vIHZhciBkZXJlZiA9IHJlcXVpcmUoJ2pzb24tc2NoZW1hLWRlcmVmLXN5bmMnKVxuLy8gdmFyIGZha2VyID0gcmVxdWlyZSgnZmFrZXInKVxuLy8gdmFyIGpzZiA9IHJlcXVpcmUoJ2pzb24tc2NoZW1hLWZha2VyJylcbi8vIGZha2VyLmxvY2FsZSA9ICdpdCdcbi8vIHZhciByZXN0bGVyID0gcmVxdWlyZSgncmVzdGxlcicpXG4vL1xudmFyIHQgPSByZXF1aXJlKCd0YXAnKVxudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJylcblxuLy8gdmFyIGplc3VzID0gcmVxdWlyZSgnLi4vamVzdXMnKVxudmFyIG1ldGEgPSB7XG4gIGNvcnJpZDogJ3Rlc3RSZXF1ZXN0JyxcbiAgdXNlcmlkOiAndGVzdFVzZXInXG59XG5jb25zdCBnZXRDb25zb2xlID0gKHNlcnZpY2VOYW1lLCBzZXJ2aWNlSWQsIHBhY2spID0+IHJlcXVpcmUoXCIuLi91dGlsc1wiKS5nZXRDb25zb2xlKHtlcnJvcjogdHJ1ZSwgZGVidWc6IHRydWUsIGxvZzogdHJ1ZSwgd2FybjogdHJ1ZX0sIHNlcnZpY2VOYW1lLCBzZXJ2aWNlSWQsIHBhY2spXG52YXIgQ09OU09MRSA9IGdldENvbnNvbGUoJ0JBU0UgVEVTVCcsICctLS0tJywgJy0tLS0tJylcblxudmFyIG11dGF0aW9uc0NxcnMgPSByZXF1aXJlKCcuLi9tdXRhdGlvbnMuY3FycycpKHtnZXRDb25zb2xlLCBtdXRhdGlvbnNQYXRoOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnbXV0YXRpb25zJyl9KVxuXG50LnRlc3QoJyoqKiBWSUVXUyBDUVJTICoqKicsIHtcbiAgYXV0b2VuZDogdHJ1ZVxufSwgYXN5bmMgZnVuY3Rpb24gbWFpblRlc3QgKHQpIHtcbiAgdC5wbGFuKDEpXG4gIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApKVxuICAvL1xuICBhd2FpdCB0LnRlc3QoJ211dGF0aW9uc0NxcnMubXV0YXRlIC0+IG11dGF0aW9uU3RhdGUnLCBhc3luYyBmdW5jdGlvbiAodCkge1xuICAgIHZhciBtdXRhdGlvbnMgPSBbXVxuICAgIG11dGF0aW9ucy5wdXNoKG11dGF0aW9uc0NxcnMubXV0YXRlKHttdXRhdGlvbjogJ3VwZGF0ZScsIG9iaklkOiAndGVzdG9iaklkJywgZGF0YToge3Rlc3REYXRhOiAxfSwgbWV0YX0pKVxuICAgIG11dGF0aW9ucy5wdXNoKG11dGF0aW9uc0NxcnMubXV0YXRlKHttdXRhdGlvbjogJ3VwZGF0ZScsIG9iaklkOiAndGVzdG9iaklkJywgZGF0YToge3Rlc3REYXRhMjogMX0sIG1ldGF9KSlcblxuICAgIHZhciBnZXRPYmpNdXRhdGlvbnMgPSBhc3luYygpID0+IHtcbiAgICAgIHJldHVybiBtdXRhdGlvbnNcbiAgICB9XG5cbiAgICB2YXIgYXBwbHlNdXRhdGlvbnMgPSBtdXRhdGlvbnNDcXJzLmFwcGx5TXV0YXRpb25zXG4gICAgdmFyIHZpZXdzQ3FycyA9IHJlcXVpcmUoJy4uL3ZpZXdzLmNxcnMnKSh7Z2V0Q29uc29sZSwgc25hcHNob3RzTWF4TXV0YXRpb25zOiAxMCwgZ2V0T2JqTXV0YXRpb25zLCBhcHBseU11dGF0aW9uc30pXG4gICAgdmFyIGFkZE11dGF0aW9ucyA9IFttdXRhdGlvbnNbMV0sIG11dGF0aW9uc0NxcnMubXV0YXRlKHttdXRhdGlvbjogJ3VwZGF0ZScsIG9iaklkOiAndGVzdG9iaklkJywgZGF0YToge3Rlc3REYXRhOiAyfSwgbWV0YX0pXVxuICAgIHZhciB2aWV3U3RhdGUgPSBhd2FpdCB2aWV3c0NxcnMucmVmcmVzaFZpZXdzKHtvYmpJZHM6IFsndGVzdG9iaklkJ10sIGxvYWRNdXRhdGlvbnM6IHRydWUsIGFkZE11dGF0aW9uc30pXG4gICAgLy8gbXV0YXRpb25zQ3Fycy5hcHBseU11dGF0aW9ucygpXG4gICAgQ09OU09MRS5kZWJ1Zygndmlld1N0YXRlJywgdmlld1N0YXRlKVxuICAgIC8vIHQub2sodmlld1N0YXRlLnRpbWVzdGFtcCwgJ211dGF0aW9uU3RhdGUudGltZXN0YW1wIHNldHRlZCcpXG4gICAgLy8gdC5zYW1lKHZpZXdTdGF0ZS52ZXJzaW9uLCAnMDAxJywgJ211dGF0aW9uU3RhdGUudmVyc2lvbiBzZXR0ZWQnKVxuICAgIHQuZW5kKClcbiAgfSlcblxuICAvLyBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDAwMCkpXG4gIHQuZW5kKClcbiAgcHJvY2Vzcy5leGl0KClcbn0pXG4iXX0=