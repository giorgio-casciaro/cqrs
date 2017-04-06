'use strict';

var R = require('ramda');
var shorthash = require('shorthash').unique;
// var path = require('path')
// var fs = require('fs')
// var jesus = require('./jesus')
var PACKAGE = 'views.cqrs';
var checkRequired = require('./utils').checkRequired;

module.exports = function getViewsCqrsPackage(_ref) {
  var getConsole = _ref.getConsole,
      _ref$serviceName = _ref.serviceName,
      serviceName = _ref$serviceName === undefined ? "unknow" : _ref$serviceName,
      _ref$serviceId = _ref.serviceId,
      serviceId = _ref$serviceId === undefined ? "unknow" : _ref$serviceId,
      _ref$snapshotsMaxMuta = _ref.snapshotsMaxMutations,
      snapshotsMaxMutations = _ref$snapshotsMaxMuta === undefined ? 10 : _ref$snapshotsMaxMuta,
      getObjMutations = _ref.getObjMutations,
      applyMutations = _ref.applyMutations;

  var CONSOLE = getConsole(serviceName, serviceId, PACKAGE);
  var errorThrow = require('./utils').errorThrow(serviceName, serviceId, PACKAGE);
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

    checkRequired({ getConsole: getConsole, getObjMutations: getObjMutations, applyMutations: applyMutations });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzLmNxcnMuZXM2Il0sIm5hbWVzIjpbIlIiLCJyZXF1aXJlIiwic2hvcnRoYXNoIiwidW5pcXVlIiwiUEFDS0FHRSIsImNoZWNrUmVxdWlyZWQiLCJtb2R1bGUiLCJleHBvcnRzIiwiZ2V0Vmlld3NDcXJzUGFja2FnZSIsImdldENvbnNvbGUiLCJzZXJ2aWNlTmFtZSIsInNlcnZpY2VJZCIsInNuYXBzaG90c01heE11dGF0aW9ucyIsImdldE9iak11dGF0aW9ucyIsImFwcGx5TXV0YXRpb25zIiwiQ09OU09MRSIsImVycm9yVGhyb3ciLCJ1cGRhdGVWaWV3Iiwib2JqSWQiLCJsYXN0U25hcHNob3QiLCJ0aW1lc3RhbXAiLCJzdGF0ZSIsImxvYWRNdXRhdGlvbnMiLCJhZGRNdXRhdGlvbnMiLCJkZWJ1ZyIsIm11dGF0aW9ucyIsIm1pblRpbWVzdGFtcCIsImNvbmNhdCIsInVuaXFCeSIsInByb3AiLCJ1cGRhdGVkVmlldyIsIl92aWV3QnVpbGRlZCIsIl92aWV3SGFzaCIsIkpTT04iLCJzdHJpbmdpZnkiLCJEYXRlIiwibm93IiwibmV3U25hcHNob3QiLCJsZW5ndGgiLCJlcnJvciIsIkVycm9yIiwicmVmcmVzaFZpZXdzIiwib2JqSWRzIiwic2luZ2xlVmlldyIsIlByb21pc2UiLCJhbGwiLCJtYXAiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsSUFBSUMsUUFBUSxPQUFSLENBQVI7QUFDQSxJQUFJQyxZQUFZRCxRQUFRLFdBQVIsRUFBcUJFLE1BQXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBTUMsVUFBVSxZQUFoQjtBQUNBLElBQU1DLGdCQUFnQkosUUFBUSxTQUFSLEVBQW1CSSxhQUF6Qzs7QUFFQUMsT0FBT0MsT0FBUCxHQUFpQixTQUFTQyxtQkFBVCxPQUFtSjtBQUFBLE1BQXBIQyxVQUFvSCxRQUFwSEEsVUFBb0g7QUFBQSw4QkFBeEdDLFdBQXdHO0FBQUEsTUFBeEdBLFdBQXdHLG9DQUE1RixRQUE0RjtBQUFBLDRCQUFsRkMsU0FBa0Y7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QkFBYyxFQUFFSSxzQkFBRixFQUFjSSxnQ0FBZCxFQUErQkMsOEJBQS9CLEVBQWQ7O0FBK0JBLFdBQU87QUFDTDJCLG9CQUFjLFNBQVNBLFlBQVQsUUFBK0Q7QUFBQSxZQUF2Q0MsTUFBdUMsU0FBdkNBLE1BQXVDO0FBQUEsWUFBL0JwQixhQUErQixTQUEvQkEsYUFBK0I7QUFBQSxZQUFoQkMsWUFBZ0IsU0FBaEJBLFlBQWdCOztBQUMzRVIsZ0JBQVFTLEtBQVIsQ0FBYyxlQUFkLEVBQStCLEVBQUNrQixjQUFELEVBQVNuQiwwQkFBVCxFQUEvQjtBQUNBLGlCQUFTb0IsVUFBVCxDQUFxQnpCLEtBQXJCLEVBQTRCO0FBQzFCLGlCQUFPRCxXQUFXLEVBQUNDLFlBQUQsRUFBUUksNEJBQVIsRUFBdUJDLDBCQUF2QixFQUFYLENBQVA7QUFDRDtBQUNELGVBQU9xQixRQUFRQyxHQUFSLENBQVk3QyxFQUFFOEMsR0FBRixDQUFNSCxVQUFOLEVBQWtCRCxNQUFsQixDQUFaLENBQVA7QUFDRDtBQVBJLEtBQVA7QUFTRCxHQXpDRCxDQXlDRSxPQUFPSCxLQUFQLEVBQWM7QUFDZHZCLHdDQUFvQyxFQUFDdUIsWUFBRCxFQUFwQztBQUNEO0FBQ0YsQ0EvQ0QiLCJmaWxlIjoidmlld3MuY3Fycy5lczYiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUiA9IHJlcXVpcmUoJ3JhbWRhJylcbnZhciBzaG9ydGhhc2ggPSByZXF1aXJlKCdzaG9ydGhhc2gnKS51bmlxdWVcbi8vIHZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG4vLyB2YXIgZnMgPSByZXF1aXJlKCdmcycpXG4vLyB2YXIgamVzdXMgPSByZXF1aXJlKCcuL2plc3VzJylcbmNvbnN0IFBBQ0tBR0UgPSAndmlld3MuY3FycydcbmNvbnN0IGNoZWNrUmVxdWlyZWQgPSByZXF1aXJlKCcuL3V0aWxzJykuY2hlY2tSZXF1aXJlZFxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldFZpZXdzQ3Fyc1BhY2thZ2UgKHtnZXRDb25zb2xlLCBzZXJ2aWNlTmFtZT1cInVua25vd1wiLCBzZXJ2aWNlSWQ9XCJ1bmtub3dcIiwgc25hcHNob3RzTWF4TXV0YXRpb25zID0gMTAsIGdldE9iak11dGF0aW9ucywgYXBwbHlNdXRhdGlvbnN9KSB7XG4gIHZhciBDT05TT0xFID0gZ2V0Q29uc29sZShzZXJ2aWNlTmFtZSwgc2VydmljZUlkLCBQQUNLQUdFKVxuICB2YXIgZXJyb3JUaHJvdyA9IHJlcXVpcmUoJy4vdXRpbHMnKS5lcnJvclRocm93KHNlcnZpY2VOYW1lLCBzZXJ2aWNlSWQsIFBBQ0tBR0UpXG4gIHRyeSB7XG4gICAgY2hlY2tSZXF1aXJlZCh7IGdldENvbnNvbGUsIGdldE9iak11dGF0aW9ucywgYXBwbHlNdXRhdGlvbnN9KVxuICAgIGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVZpZXcgKHtvYmpJZCwgbGFzdFNuYXBzaG90ID0ge3RpbWVzdGFtcDogMCwgc3RhdGU6IHt9fSwgbG9hZE11dGF0aW9ucyA9IHRydWUsIGFkZE11dGF0aW9ucyA9IFtdfSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gQ09MTEVDVCBNVVRBVElPTlMgQU5EIFVQREFURSBWSUVXXG4gICAgICAgIENPTlNPTEUuZGVidWcoJ3VwZGF0ZVZpZXcnLCB7b2JqSWQsIGxhc3RTbmFwc2hvdCwgbG9hZE11dGF0aW9ucywgYWRkTXV0YXRpb25zIH0pXG4gICAgICAgIHZhciBtdXRhdGlvbnMgPSBbXVxuICAgICAgICBpZiAobG9hZE11dGF0aW9ucyltdXRhdGlvbnMgPSBhd2FpdCBnZXRPYmpNdXRhdGlvbnMoe29iaklkLCBtaW5UaW1lc3RhbXA6IGxhc3RTbmFwc2hvdC50aW1lc3RhbXB9KVxuICAgICAgICBDT05TT0xFLmRlYnVnKCdsb2FkZWQgTXV0YXRpb25zJywge211dGF0aW9ucyB9KVxuICAgICAgICBtdXRhdGlvbnMgPSBtdXRhdGlvbnMuY29uY2F0KGFkZE11dGF0aW9ucylcbiAgICAgICAgQ09OU09MRS5kZWJ1ZygndG90YWwgTXV0YXRpb25zJywge211dGF0aW9ucyB9KVxuICAgICAgICBtdXRhdGlvbnMgPSBSLnVuaXFCeShSLnByb3AoJ19pZCcpLCBtdXRhdGlvbnMpXG4gICAgICAgIENPTlNPTEUuZGVidWcoJ2ZpbHRlcmVkIE11dGF0aW9ucycsIHttdXRhdGlvbnMgfSlcbiAgICAgICAgdmFyIHVwZGF0ZWRWaWV3ID0gYXdhaXQgYXBwbHlNdXRhdGlvbnMoe3N0YXRlOiBsYXN0U25hcHNob3Quc3RhdGUsIG11dGF0aW9uc30pXG5cbiAgICAgICAgLy8gVklFVyBNRVRBIERBVEEgX3ZpZXdcbiAgICAgICAgaWYgKHVwZGF0ZWRWaWV3Ll92aWV3QnVpbGRlZCkgZGVsZXRlIHVwZGF0ZWRWaWV3Ll92aWV3QnVpbGRlZFxuICAgICAgICBpZiAodXBkYXRlZFZpZXcuX3ZpZXdIYXNoKSBkZWxldGUgdXBkYXRlZFZpZXcuX3ZpZXdIYXNoXG4gICAgICAgIHVwZGF0ZWRWaWV3Ll92aWV3SGFzaCA9IHNob3J0aGFzaChKU09OLnN0cmluZ2lmeSh1cGRhdGVkVmlldykpXG4gICAgICAgIHVwZGF0ZWRWaWV3Ll92aWV3QnVpbGRlZCA9IERhdGUubm93KClcblxuICAgICAgICAvLyBORVcgU05BUFNIT1RcbiAgICAgICAgdmFyIG5ld1NuYXBzaG90ID0gZmFsc2VcbiAgICAgICAgaWYgKHNuYXBzaG90c01heE11dGF0aW9ucyA8IG11dGF0aW9ucyAmJiBtdXRhdGlvbnMubGVuZ3RoKSBuZXdTbmFwc2hvdCA9IHt0aW1lc3RhbXA6IERhdGUubm93KCksIHN0YXRlOiB1cGRhdGVkVmlld30gLy8gdXBkYXRlIHNuYXBzaG90IGlmIHJlcXVpcmVkXG5cbiAgICAgICAgQ09OU09MRS5kZWJ1ZygndXBkYXRlZFZpZXcnLCB7dXBkYXRlZFZpZXcsIG11dGF0aW9uc30pXG4gICAgICAgIHJldHVybiB7dXBkYXRlZFZpZXcsIG5ld1NuYXBzaG90fVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgQ09OU09MRS5lcnJvcihlcnJvcilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFBBQ0tBR0UgKyBgIHVwZGF0ZVZpZXdgKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgcmVmcmVzaFZpZXdzOiBmdW5jdGlvbiByZWZyZXNoVmlld3MgKHtvYmpJZHMsIGxvYWRNdXRhdGlvbnMsIGFkZE11dGF0aW9ucyB9KSB7XG4gICAgICAgIENPTlNPTEUuZGVidWcoJ3JlZnJlc2hzVmlld3MnLCB7b2JqSWRzLCBhZGRNdXRhdGlvbnMgfSlcbiAgICAgICAgZnVuY3Rpb24gc2luZ2xlVmlldyAob2JqSWQpIHtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlVmlldyh7b2JqSWQsIGxvYWRNdXRhdGlvbnMsIGFkZE11dGF0aW9uc30pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFIubWFwKHNpbmdsZVZpZXcsIG9iaklkcykpXG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGVycm9yVGhyb3coYGdldFZpZXdzQ3Fyc1BhY2thZ2UoKWAsIHtlcnJvcn0pXG4gIH1cbn1cbiJdfQ==