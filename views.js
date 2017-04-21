'use strict';

var R = require('ramda');
var shorthash = require('shorthash').unique;
// var path = require('path')
// var fs = require('fs')
// var jesus = require('./jesus')
var PACKAGE = 'views.cqrs';
var checkRequired = require('./utils').checkRequired;
var getConsole = function getConsole(serviceName, serviceId, pack) {
  return require('./utils').getConsole({ error: true, debug: true, log: true, warn: true }, serviceName, serviceId, pack);
};

module.exports = function getViewsCqrsPackage(_ref) {
  var _ref$serviceName = _ref.serviceName,
      serviceName = _ref$serviceName === undefined ? "unknow" : _ref$serviceName,
      _ref$serviceId = _ref.serviceId,
      serviceId = _ref$serviceId === undefined ? "unknow" : _ref$serviceId,
      _ref$snapshotsMaxMuta = _ref.snapshotsMaxMutations,
      snapshotsMaxMutations = _ref$snapshotsMaxMuta === undefined ? 10 : _ref$snapshotsMaxMuta;

  var CONSOLE = getConsole(serviceName, serviceId, PACKAGE);
  var errorThrow = require('./utils').errorThrow(serviceName, serviceId, PACKAGE);
  //getObjMutations, applyMutations
  try {
    var updateView = function _callee(_ref2) {
      var objId = _ref2.objId,
          _ref2$lastSnapshot = _ref2.lastSnapshot,
          lastSnapshot = _ref2$lastSnapshot === undefined ? { timestamp: 0, state: {} } : _ref2$lastSnapshot,
          _ref2$loadMutations = _ref2.loadMutations,
          loadMutations = _ref2$loadMutations === undefined ? true : _ref2$loadMutations,
          _ref2$addMutations = _ref2.addMutations,
          addMutations = _ref2$addMutations === undefined ? [] : _ref2$addMutations;
      var mutations, updatedView, newSnapshot;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              // COLLECT MUTATIONS AND UPDATE VIEW
              CONSOLE.debug('updateView', { objId: objId, lastSnapshot: lastSnapshot, loadMutations: loadMutations, addMutations: addMutations });
              mutations = [];

              if (!loadMutations) {
                _context.next = 7;
                break;
              }

              _context.next = 6;
              return regeneratorRuntime.awrap(getObjMutations({ objId: objId, minTimestamp: lastSnapshot.timestamp }));

            case 6:
              mutations = _context.sent;

            case 7:
              CONSOLE.debug('loaded Mutations', { mutations: mutations });
              mutations = mutations.concat(addMutations);
              CONSOLE.debug('total Mutations', { mutations: mutations });
              mutations = R.uniqBy(R.prop('_id'), mutations);
              CONSOLE.debug('filtered Mutations', { mutations: mutations });
              _context.next = 14;
              return regeneratorRuntime.awrap(applyMutations({ state: lastSnapshot.state, mutations: mutations }));

            case 14:
              updatedView = _context.sent;


              // VIEW META DATA _view
              if (updatedView._viewBuilded) delete updatedView._viewBuilded;
              if (updatedView._viewHash) delete updatedView._viewHash;
              updatedView._viewHash = shorthash(JSON.stringify(updatedView));
              updatedView._viewBuilded = Date.now();

              // NEW SNAPSHOT
              newSnapshot = false;

              if (snapshotsMaxMutations < mutations && mutations.length) newSnapshot = { timestamp: Date.now(), state: updatedView }; // update snapshot if required

              CONSOLE.debug('updatedView', { updatedView: updatedView, mutations: mutations });
              return _context.abrupt('return', { updatedView: updatedView, newSnapshot: newSnapshot });

            case 25:
              _context.prev = 25;
              _context.t0 = _context['catch'](0);

              CONSOLE.error(_context.t0);
              throw new Error(PACKAGE + ' updateView');

            case 29:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this, [[0, 25]]);
    };

    checkRequired({});

    return {
      refreshViews: function refreshViews(_ref3) {
        var objIds = _ref3.objIds,
            loadMutations = _ref3.loadMutations,
            addMutations = _ref3.addMutations;

        CONSOLE.debug('refreshsViews', { objIds: objIds, addMutations: addMutations });
        function singleView(objId) {
          return updateView({ objId: objId, loadMutations: loadMutations, addMutations: addMutations });
        }
        return Promise.all(R.map(singleView, objIds));
      }
    };
  } catch (error) {
    errorThrow('getViewsCqrsPackage()', { error: error });
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzLmVzNiJdLCJuYW1lcyI6WyJSIiwicmVxdWlyZSIsInNob3J0aGFzaCIsInVuaXF1ZSIsIlBBQ0tBR0UiLCJjaGVja1JlcXVpcmVkIiwiZ2V0Q29uc29sZSIsInNlcnZpY2VOYW1lIiwic2VydmljZUlkIiwicGFjayIsImVycm9yIiwiZGVidWciLCJsb2ciLCJ3YXJuIiwibW9kdWxlIiwiZXhwb3J0cyIsImdldFZpZXdzQ3Fyc1BhY2thZ2UiLCJzbmFwc2hvdHNNYXhNdXRhdGlvbnMiLCJDT05TT0xFIiwiZXJyb3JUaHJvdyIsInVwZGF0ZVZpZXciLCJvYmpJZCIsImxhc3RTbmFwc2hvdCIsInRpbWVzdGFtcCIsInN0YXRlIiwibG9hZE11dGF0aW9ucyIsImFkZE11dGF0aW9ucyIsIm11dGF0aW9ucyIsImdldE9iak11dGF0aW9ucyIsIm1pblRpbWVzdGFtcCIsImNvbmNhdCIsInVuaXFCeSIsInByb3AiLCJhcHBseU11dGF0aW9ucyIsInVwZGF0ZWRWaWV3IiwiX3ZpZXdCdWlsZGVkIiwiX3ZpZXdIYXNoIiwiSlNPTiIsInN0cmluZ2lmeSIsIkRhdGUiLCJub3ciLCJuZXdTbmFwc2hvdCIsImxlbmd0aCIsIkVycm9yIiwicmVmcmVzaFZpZXdzIiwib2JqSWRzIiwic2luZ2xlVmlldyIsIlByb21pc2UiLCJhbGwiLCJtYXAiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsSUFBSUMsUUFBUSxPQUFSLENBQVI7QUFDQSxJQUFJQyxZQUFZRCxRQUFRLFdBQVIsRUFBcUJFLE1BQXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBTUMsVUFBVSxZQUFoQjtBQUNBLElBQU1DLGdCQUFnQkosUUFBUSxTQUFSLEVBQW1CSSxhQUF6QztBQUNBLElBQU1DLGFBQWEsU0FBYkEsVUFBYSxDQUFDQyxXQUFELEVBQWNDLFNBQWQsRUFBeUJDLElBQXpCO0FBQUEsU0FBa0NSLFFBQVEsU0FBUixFQUFtQkssVUFBbkIsQ0FBOEIsRUFBQ0ksT0FBTyxJQUFSLEVBQWNDLE9B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SiwrQ0F3QlcsRUFBQ08sd0JBQUQsRUFBY08sd0JBQWQsRUF4Qlg7O0FBQUE7QUFBQTtBQUFBOztBQTBCSXZCLHNCQUFRUixLQUFSO0FBMUJKLG9CQTJCVSxJQUFJaUMsS0FBSixDQUFVdkMsdUJBQVYsQ0EzQlY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FGRTs7QUFDRkMsa0JBQWMsRUFBZDs7QUErQkEsV0FBTztBQUNMdUMsb0JBQWMsU0FBU0EsWUFBVCxRQUErRDtBQUFBLFlBQXZDQyxNQUF1QyxTQUF2Q0EsTUFBdUM7QUFBQSxZQUEvQnBCLGFBQStCLFNBQS9CQSxhQUErQjtBQUFBLFlBQWhCQyxZQUFnQixTQUFoQkEsWUFBZ0I7O0FBQzNFUixnQkFBUVAsS0FBUixDQUFjLGVBQWQsRUFBK0IsRUFBQ2tDLGNBQUQsRUFBU25CLDBCQUFULEVBQS9CO0FBQ0EsaUJBQVNvQixVQUFULENBQXFCekIsS0FBckIsRUFBNEI7QUFDMUIsaUJBQU9ELFdBQVcsRUFBQ0MsWUFBRCxFQUFRSSw0QkFBUixFQUF1QkMsMEJBQXZCLEVBQVgsQ0FBUDtBQUNEO0FBQ0QsZUFBT3FCLFFBQVFDLEdBQVIsQ0FBWWhELEVBQUVpRCxHQUFGLENBQU1ILFVBQU4sRUFBa0JELE1BQWxCLENBQVosQ0FBUDtBQUNEO0FBUEksS0FBUDtBQVNELEdBekNELENBeUNFLE9BQU9uQyxLQUFQLEVBQWM7QUFDZFMsd0NBQW9DLEVBQUNULFlBQUQsRUFBcEM7QUFDRDtBQUNGLENBaEREIiwiZmlsZSI6InZpZXdzLmVzNiIsInNvdXJjZXNDb250ZW50IjpbInZhciBSID0gcmVxdWlyZSgncmFtZGEnKVxudmFyIHNob3J0aGFzaCA9IHJlcXVpcmUoJ3Nob3J0aGFzaCcpLnVuaXF1ZVxuLy8gdmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJylcbi8vIHZhciBmcyA9IHJlcXVpcmUoJ2ZzJylcbi8vIHZhciBqZXN1cyA9IHJlcXVpcmUoJy4vamVzdXMnKVxuY29uc3QgUEFDS0FHRSA9ICd2aWV3cy5jcXJzJ1xuY29uc3QgY2hlY2tSZXF1aXJlZCA9IHJlcXVpcmUoJy4vdXRpbHMnKS5jaGVja1JlcXVpcmVkXG5jb25zdCBnZXRDb25zb2xlID0gKHNlcnZpY2VOYW1lLCBzZXJ2aWNlSWQsIHBhY2spID0+IHJlcXVpcmUoJy4vdXRpbHMnKS5nZXRDb25zb2xlKHtlcnJvcjogdHJ1ZSwgZGVidWc6IHRydWUsIGxvZzogdHJ1ZSwgd2FybjogdHJ1ZX0sIHNlcnZpY2VOYW1lLCBzZXJ2aWNlSWQsIHBhY2spXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0Vmlld3NDcXJzUGFja2FnZSAoeyBzZXJ2aWNlTmFtZT1cInVua25vd1wiLCBzZXJ2aWNlSWQ9XCJ1bmtub3dcIiwgc25hcHNob3RzTWF4TXV0YXRpb25zID0gMTB9KSB7XG4gIHZhciBDT05TT0xFID0gZ2V0Q29uc29sZShzZXJ2aWNlTmFtZSwgc2VydmljZUlkLCBQQUNLQUdFKVxuICB2YXIgZXJyb3JUaHJvdyA9IHJlcXVpcmUoJy4vdXRpbHMnKS5lcnJvclRocm93KHNlcnZpY2VOYW1lLCBzZXJ2aWNlSWQsIFBBQ0tBR0UpXG4gIC8vZ2V0T2JqTXV0YXRpb25zLCBhcHBseU11dGF0aW9uc1xuICB0cnkge1xuICAgIGNoZWNrUmVxdWlyZWQoeyB9KVxuICAgIGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVZpZXcgKHtvYmpJZCwgbGFzdFNuYXBzaG90ID0ge3RpbWVzdGFtcDogMCwgc3RhdGU6IHt9fSwgbG9hZE11dGF0aW9ucyA9IHRydWUsIGFkZE11dGF0aW9ucyA9IFtdfSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gQ09MTEVDVCBNVVRBVElPTlMgQU5EIFVQREFURSBWSUVXXG4gICAgICAgIENPTlNPTEUuZGVidWcoJ3VwZGF0ZVZpZXcnLCB7b2JqSWQsIGxhc3RTbmFwc2hvdCwgbG9hZE11dGF0aW9ucywgYWRkTXV0YXRpb25zIH0pXG4gICAgICAgIHZhciBtdXRhdGlvbnMgPSBbXVxuICAgICAgICBpZiAobG9hZE11dGF0aW9ucyltdXRhdGlvbnMgPSBhd2FpdCBnZXRPYmpNdXRhdGlvbnMoe29iaklkLCBtaW5UaW1lc3RhbXA6IGxhc3RTbmFwc2hvdC50aW1lc3RhbXB9KVxuICAgICAgICBDT05TT0xFLmRlYnVnKCdsb2FkZWQgTXV0YXRpb25zJywge211dGF0aW9ucyB9KVxuICAgICAgICBtdXRhdGlvbnMgPSBtdXRhdGlvbnMuY29uY2F0KGFkZE11dGF0aW9ucylcbiAgICAgICAgQ09OU09MRS5kZWJ1ZygndG90YWwgTXV0YXRpb25zJywge211dGF0aW9ucyB9KVxuICAgICAgICBtdXRhdGlvbnMgPSBSLnVuaXFCeShSLnByb3AoJ19pZCcpLCBtdXRhdGlvbnMpXG4gICAgICAgIENPTlNPTEUuZGVidWcoJ2ZpbHRlcmVkIE11dGF0aW9ucycsIHttdXRhdGlvbnMgfSlcbiAgICAgICAgdmFyIHVwZGF0ZWRWaWV3ID0gYXdhaXQgYXBwbHlNdXRhdGlvbnMoe3N0YXRlOiBsYXN0U25hcHNob3Quc3RhdGUsIG11dGF0aW9uc30pXG5cbiAgICAgICAgLy8gVklFVyBNRVRBIERBVEEgX3ZpZXdcbiAgICAgICAgaWYgKHVwZGF0ZWRWaWV3Ll92aWV3QnVpbGRlZCkgZGVsZXRlIHVwZGF0ZWRWaWV3Ll92aWV3QnVpbGRlZFxuICAgICAgICBpZiAodXBkYXRlZFZpZXcuX3ZpZXdIYXNoKSBkZWxldGUgdXBkYXRlZFZpZXcuX3ZpZXdIYXNoXG4gICAgICAgIHVwZGF0ZWRWaWV3Ll92aWV3SGFzaCA9IHNob3J0aGFzaChKU09OLnN0cmluZ2lmeSh1cGRhdGVkVmlldykpXG4gICAgICAgIHVwZGF0ZWRWaWV3Ll92aWV3QnVpbGRlZCA9IERhdGUubm93KClcblxuICAgICAgICAvLyBORVcgU05BUFNIT1RcbiAgICAgICAgdmFyIG5ld1NuYXBzaG90ID0gZmFsc2VcbiAgICAgICAgaWYgKHNuYXBzaG90c01heE11dGF0aW9ucyA8IG11dGF0aW9ucyAmJiBtdXRhdGlvbnMubGVuZ3RoKSBuZXdTbmFwc2hvdCA9IHt0aW1lc3RhbXA6IERhdGUubm93KCksIHN0YXRlOiB1cGRhdGVkVmlld30gLy8gdXBkYXRlIHNuYXBzaG90IGlmIHJlcXVpcmVkXG5cbiAgICAgICAgQ09OU09MRS5kZWJ1ZygndXBkYXRlZFZpZXcnLCB7dXBkYXRlZFZpZXcsIG11dGF0aW9uc30pXG4gICAgICAgIHJldHVybiB7dXBkYXRlZFZpZXcsIG5ld1NuYXBzaG90fVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgQ09OU09MRS5lcnJvcihlcnJvcilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFBBQ0tBR0UgKyBgIHVwZGF0ZVZpZXdgKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgcmVmcmVzaFZpZXdzOiBmdW5jdGlvbiByZWZyZXNoVmlld3MgKHtvYmpJZHMsIGxvYWRNdXRhdGlvbnMsIGFkZE11dGF0aW9ucyB9KSB7XG4gICAgICAgIENPTlNPTEUuZGVidWcoJ3JlZnJlc2hzVmlld3MnLCB7b2JqSWRzLCBhZGRNdXRhdGlvbnMgfSlcbiAgICAgICAgZnVuY3Rpb24gc2luZ2xlVmlldyAob2JqSWQpIHtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlVmlldyh7b2JqSWQsIGxvYWRNdXRhdGlvbnMsIGFkZE11dGF0aW9uc30pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFIubWFwKHNpbmdsZVZpZXcsIG9iaklkcykpXG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGVycm9yVGhyb3coYGdldFZpZXdzQ3Fyc1BhY2thZ2UoKWAsIHtlcnJvcn0pXG4gIH1cbn1cbiJdfQ==