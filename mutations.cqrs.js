'use strict';

var R = require('ramda');
var path = require('path');

var fs = require('fs');
var PACKAGE = 'mutations.cqrs';
var checkRequired = require('./utils').checkRequired;
var checkRequiredFiles = require('./utils').checkRequiredFiles;
var uuidV4 = require('uuid/v4');

function getMutationsFunctions(basePath) {
  var filesJsNoExtension = R.map(R.compose(R.replace('.js', ''), path.basename), R.filter(function (file) {
    return path.extname(file) === '.js';
  }, fs.readdirSync(basePath)));
  var splitFiles = R.map(R.split('.'));
  var sortFiles = R.compose(R.reverse, R.sortBy(R.compose(parseInt, R.prop(0))));
  var groupFiles = R.groupBy(R.prop(0));
  var addFunction = R.map(R.map(function (element) {
    return { mutationId: element[0], mutationVersion: element[1] };
  }));
  var mutationsFunctions = R.compose(addFunction, groupFiles, sortFiles, splitFiles)(filesJsNoExtension);
  // debug('getMutationsFunctions', mutationsFunctions)
  return mutationsFunctions;
}

function checkMutationFunction(mutationId, mutationsFunctions) {
  if (!mutationsFunctions[mutationId] || !mutationsFunctions[mutationId][0]) {
    errorThrow('mutation not defined', { mutationId: mutationId });
  }
}

function generateId() {
  return uuidV4();
}
module.exports = function getMutationsCqrsPackage(_ref) {
  var getConsole = _ref.getConsole,
      _ref$serviceName = _ref.serviceName,
      serviceName = _ref$serviceName === undefined ? 'unknow' : _ref$serviceName,
      _ref$serviceId = _ref.serviceId,
      serviceId = _ref$serviceId === undefined ? 'unknow' : _ref$serviceId,
      mutationsPath = _ref.mutationsPath;

  var CONSOLE = getConsole(serviceName, serviceId, PACKAGE);
  var errorThrow = require('./utils').errorThrow(serviceName, serviceId, PACKAGE);

  var applyMutationsFromPath = function applyMutationsFromPathFunc(originalState, mutations, mutationsPath) {
    var state = R.clone(originalState);
    CONSOLE.debug('applyMutationsFromPath', { state: state, mutations: mutations, mutationsPath: mutationsPath });
    function applyMutation(state, mutation) {
      var mutationFile = path.join(mutationsPath, mutation.mutation + '.' + mutation.version + '.js');
      CONSOLE.debug('applyMutation', { mutationFile: mutationFile, state: state, data: mutation.data });
      return require(mutationFile)(state, mutation.data);
    }
    return R.reduce(applyMutation, state, mutations);
  };

  try {
    checkRequired({ mutationsPath: mutationsPath }, PACKAGE);
    checkRequiredFiles([mutationsPath], PACKAGE);
    return {
      mutate: function mutate(_ref2) {
        var mutation = _ref2.mutation,
            objId = _ref2.objId,
            data = _ref2.data,
            meta = _ref2.meta;

        try {
          checkRequired({ objId: objId, mutation: mutation }, PACKAGE);
          var mutationsFunctions = getMutationsFunctions(mutationsPath);
          checkMutationFunction(mutation, mutationsFunctions);
          var lastMutationVersion = mutationsFunctions[mutation][0].mutationVersion;
          var mutationState = {
            objId: objId,
            _id: generateId(),
            mutation: mutation,
            meta: meta,
            version: lastMutationVersion,
            timestamp: new Date().getTime() / 1000,
            data: data
          };
          CONSOLE.debug('dataSingleMutation to create', { mutation: mutation, lastMutationVersion: lastMutationVersion, objId: objId, data: data, mutationState: mutationState });
          return mutationState;
        } catch (error) {
          errorThrow('mutate(args) Error', { error: error, mutation: mutation, objId: objId, data: data });
        }
      },
      applyMutations: function applyMutations(_ref3) {
        var state = _ref3.state,
            mutations = _ref3.mutations;
        return regeneratorRuntime.async(function applyMutations$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                CONSOLE.debug('applyMutationsFromPath', { state: state, mutations: mutations, mutationsPath: mutationsPath });
                return _context.abrupt('return', applyMutationsFromPath(state, mutations, mutationsPath));

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, null, this);
      }
    };
  } catch (error) {
    errorThrow('getMutationsCqrsPackage', { error: error, mutationsPath: mutationsPath, mutationsStoragePackage: mutationsStoragePackage });
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm11dGF0aW9ucy5jcXJzLmVzNiJdLCJuYW1lcyI6WyJSIiwicmVxdWlyZSIsInBhdGgiLCJmcyIsIlBBQ0tBR0UiLCJjaGVja1JlcXVpcmVkIiwiY2hlY2tSZXF1aXJlZEZpbGVzIiwidXVpZFY0IiwiZ2V0TXV0YXRpb25zRnVuY3Rpb25zIiwiYmFzZVBhdGgiLCJmaWxlc0pzTm9FeHRlbnNpb24iLCJtYXAiLCJjb21wb3NlIiwicmVwbGFjZSIsImJhc2VuYW1lIiwiZmlsdGVyIiwiZmlsZSIsImV4dG5hbWUiLCJyZWFkZGlyU3luYyIsInNwbGl0RmlsZXMiLCJzcGxpdCIsInNvcnRGaWxlcyIsInJldmVyc2UiLCJzb3J0QnkiLCJwYXJzZUludCIsInByb3AiLCJncm91cEZpbGVzIiwiZ3JvdXBCeSIsImFkZEZ1bmN0aW9uIiwiZWxlbWVudCIsIm11dGF0aW9uSWQiLCJtdXRhdGlvblZlcnNpb24iLCJtdXRhdGlvbnNGdW5jdGlvbnMiLCJjaGVja011dGF0aW9uRnVuY3Rpb24iLCJlcnJvclRocm93IiwiZ2VuZXJhdGVJZCIsIm1vZHVsZSIsImV4cG9ydHMiLCJnZXRNdXRhdGlvbnNDcXJzUGFja2FnZSIsImdldENvbnNvbGUiLCJzZXJ2aWNlTmFtZSIsInNlcnZpY2VJZCIsIm11dGF0aW9uc1BhdGgiLCJDT05TT0xFIiwiYXBwbHlNdXRhdGlvbnNGcm9tUGF0aCIsImFwcGx5TXV0YXRpb25zRnJvbVBhdGhGdW5jIiwib3JpZ2luYWxTdGF0ZSIsIm11dGF0aW9ucyIsInN0YXRlIiwiY2xvbmUiLCJkZWJ1ZyIsImFwcGx5TXV0YXRpb24iLCJtdXRhdGlvbiIsIm11dGF0aW9uRmlsZSIsImpvaW4iLCJ2ZXJzaW9uIiwiZGF0YSIsInJlZHVjZSIsIm11dGF0ZSIsIm9iaklkIiwibWV0YSIsImxhc3RNdXRhdGlvblZlcnNpb24iLCJtdXRhdGlvblN0YXRlIiwiX2lkIiwidGltZXN0YW1wIiwiRGF0ZSIsImdldFRpbWUiLCJlcnJvciIsImFwcGx5TXV0YXRpb25z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QWhERCIsImZpbGUiOiJtdXRhdGlvbnMuY3Fycy5lczYiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUiA9IHJlcXVpcmUoJ3JhbWRhJylcbnZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5cbnZhciBmcyA9IHJlcXVpcmUoJ2ZzJylcbmNvbnN0IFBBQ0tBR0UgPSAnbXV0YXRpb25zLmNxcnMnXG5jb25zdCBjaGVja1JlcXVpcmVkID0gcmVxdWlyZSgnLi91dGlscycpLmNoZWNrUmVxdWlyZWRcbnZhciBjaGVja1JlcXVpcmVkRmlsZXMgPSByZXF1aXJlKCcuL3V0aWxzJykuY2hlY2tSZXF1aXJlZEZpbGVzXG5jb25zdCB1dWlkVjQgPSByZXF1aXJlKCd1dWlkL3Y0JylcblxuZnVuY3Rpb24gZ2V0TXV0YXRpb25zRnVuY3Rpb25zIChiYXNlUGF0aCkge1xuICB2YXIgZmlsZXNKc05vRXh0ZW5zaW9uID0gUi5tYXAoUi5jb21wb3NlKFIucmVwbGFjZSgnLmpzJywgJycpLCBwYXRoLmJhc2VuYW1lKSwgUi5maWx0ZXIoKGZpbGUpID0+IHBhdGguZXh0bmFtZShmaWxlKSA9PT0gJy5qcycsIGZzLnJlYWRkaXJTeW5jKGJhc2VQYXRoKSkpXG4gIHZhciBzcGxpdEZpbGVzID0gUi5tYXAoUi5zcGxpdCgnLicpKVxuICB2YXIgc29ydEZpbGVzID0gUi5jb21wb3NlKFIucmV2ZXJzZSwgUi5zb3J0QnkoUi5jb21wb3NlKHBhcnNlSW50LCBSLnByb3AoMCkpKSlcbiAgdmFyIGdyb3VwRmlsZXMgPSBSLmdyb3VwQnkoUi5wcm9wKDApKVxuICB2YXIgYWRkRnVuY3Rpb24gPSBSLm1hcChSLm1hcCgoZWxlbWVudCkgPT4ge1xuICAgIHJldHVybiB7bXV0YXRpb25JZDogZWxlbWVudFswXSwgbXV0YXRpb25WZXJzaW9uOiBlbGVtZW50WzFdfVxuICB9KSlcbiAgdmFyIG11dGF0aW9uc0Z1bmN0aW9ucyA9IFIuY29tcG9zZShhZGRGdW5jdGlvbiwgZ3JvdXBGaWxlcywgc29ydEZpbGVzLCBzcGxpdEZpbGVzKShmaWxlc0pzTm9FeHRlbnNpb24pXG4gIC8vIGRlYnVnKCdnZXRNdXRhdGlvbnNGdW5jdGlvbnMnLCBtdXRhdGlvbnNGdW5jdGlvbnMpXG4gIHJldHVybiBtdXRhdGlvbnNGdW5jdGlvbnNcbn1cblxuZnVuY3Rpb24gY2hlY2tNdXRhdGlvbkZ1bmN0aW9uIChtdXRhdGlvbklkLCBtdXRhdGlvbnNGdW5jdGlvbnMpIHtcbiAgaWYgKCFtdXRhdGlvbnNGdW5jdGlvbnNbbXV0YXRpb25JZF0gfHwgIW11dGF0aW9uc0Z1bmN0aW9uc1ttdXRhdGlvbklkXVswXSkge1xuICAgIGVycm9yVGhyb3coJ211dGF0aW9uIG5vdCBkZWZpbmVkJywge211dGF0aW9uSWR9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlSWQgKCkgeyByZXR1cm4gdXVpZFY0KCkgfVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRNdXRhdGlvbnNDcXJzUGFja2FnZSAoe2dldENvbnNvbGUsIHNlcnZpY2VOYW1lID0gJ3Vua25vdycsIHNlcnZpY2VJZCA9ICd1bmtub3cnLCBtdXRhdGlvbnNQYXRofSkge1xuICB2YXIgQ09OU09MRSA9IGdldENvbnNvbGUoc2VydmljZU5hbWUsIHNlcnZpY2VJZCwgUEFDS0FHRSlcbiAgdmFyIGVycm9yVGhyb3cgPSByZXF1aXJlKCcuL3V0aWxzJykuZXJyb3JUaHJvdyhzZXJ2aWNlTmFtZSwgc2VydmljZUlkLCBQQUNLQUdFKVxuXG4gIHZhciBhcHBseU11dGF0aW9uc0Zyb21QYXRoID0gZnVuY3Rpb24gYXBwbHlNdXRhdGlvbnNGcm9tUGF0aEZ1bmMgKG9yaWdpbmFsU3RhdGUsIG11dGF0aW9ucywgbXV0YXRpb25zUGF0aCkge1xuICAgIHZhciBzdGF0ZSA9IFIuY2xvbmUob3JpZ2luYWxTdGF0ZSlcbiAgICBDT05TT0xFLmRlYnVnKCdhcHBseU11dGF0aW9uc0Zyb21QYXRoJywge3N0YXRlLCBtdXRhdGlvbnMsIG11dGF0aW9uc1BhdGh9KVxuICAgIGZ1bmN0aW9uIGFwcGx5TXV0YXRpb24gKHN0YXRlLCBtdXRhdGlvbikge1xuICAgICAgdmFyIG11dGF0aW9uRmlsZSA9IHBhdGguam9pbihtdXRhdGlvbnNQYXRoLCBgJHttdXRhdGlvbi5tdXRhdGlvbn0uJHttdXRhdGlvbi52ZXJzaW9ufS5qc2ApXG4gICAgICBDT05TT0xFLmRlYnVnKCdhcHBseU11dGF0aW9uJywge211dGF0aW9uRmlsZSwgc3RhdGUsIGRhdGE6IG11dGF0aW9uLmRhdGF9KVxuICAgICAgcmV0dXJuIHJlcXVpcmUobXV0YXRpb25GaWxlKShzdGF0ZSwgbXV0YXRpb24uZGF0YSlcbiAgICB9XG4gICAgcmV0dXJuIFIucmVkdWNlKGFwcGx5TXV0YXRpb24sIHN0YXRlLCBtdXRhdGlvbnMpXG4gIH1cblxuICB0cnkge1xuICAgIGNoZWNrUmVxdWlyZWQoe211dGF0aW9uc1BhdGh9LCBQQUNLQUdFKVxuICAgIGNoZWNrUmVxdWlyZWRGaWxlcyhbbXV0YXRpb25zUGF0aF0sIFBBQ0tBR0UpXG4gICAgcmV0dXJuIHtcbiAgICAgIG11dGF0ZTogZnVuY3Rpb24gbXV0YXRlICh7bXV0YXRpb24sIG9iaklkLCBkYXRhLCBtZXRhfSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNoZWNrUmVxdWlyZWQoe29iaklkLCBtdXRhdGlvbn0sIFBBQ0tBR0UpXG4gICAgICAgICAgdmFyIG11dGF0aW9uc0Z1bmN0aW9ucyA9IGdldE11dGF0aW9uc0Z1bmN0aW9ucyhtdXRhdGlvbnNQYXRoKVxuICAgICAgICAgIGNoZWNrTXV0YXRpb25GdW5jdGlvbihtdXRhdGlvbiwgbXV0YXRpb25zRnVuY3Rpb25zKVxuICAgICAgICAgIHZhciBsYXN0TXV0YXRpb25WZXJzaW9uID0gbXV0YXRpb25zRnVuY3Rpb25zW211dGF0aW9uXVswXS5tdXRhdGlvblZlcnNpb25cbiAgICAgICAgICB2YXIgbXV0YXRpb25TdGF0ZSA9IHtcbiAgICAgICAgICAgIG9iaklkOiBvYmpJZCxcbiAgICAgICAgICAgIF9pZDogZ2VuZXJhdGVJZCgpLFxuICAgICAgICAgICAgbXV0YXRpb24sXG4gICAgICAgICAgICBtZXRhLFxuICAgICAgICAgICAgdmVyc2lvbjogbGFzdE11dGF0aW9uVmVyc2lvbixcbiAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwLFxuICAgICAgICAgICAgZGF0YVxuICAgICAgICAgIH1cbiAgICAgICAgICBDT05TT0xFLmRlYnVnKCdkYXRhU2luZ2xlTXV0YXRpb24gdG8gY3JlYXRlJywge211dGF0aW9uLCBsYXN0TXV0YXRpb25WZXJzaW9uLCBvYmpJZCwgZGF0YSwgbXV0YXRpb25TdGF0ZX0pXG4gICAgICAgICAgcmV0dXJuIG11dGF0aW9uU3RhdGVcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBlcnJvclRocm93KCdtdXRhdGUoYXJncykgRXJyb3InLCB7ZXJyb3IsIG11dGF0aW9uLCBvYmpJZCwgZGF0YX0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBhcHBseU11dGF0aW9uczogYXN5bmMgZnVuY3Rpb24gYXBwbHlNdXRhdGlvbnMgKHtzdGF0ZSwgbXV0YXRpb25zfSkge1xuICAgICAgICBDT05TT0xFLmRlYnVnKCdhcHBseU11dGF0aW9uc0Zyb21QYXRoJywge3N0YXRlLCBtdXRhdGlvbnMsIG11dGF0aW9uc1BhdGh9KVxuICAgICAgICByZXR1cm4gYXBwbHlNdXRhdGlvbnNGcm9tUGF0aChzdGF0ZSwgbXV0YXRpb25zLCBtdXRhdGlvbnNQYXRoKVxuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBlcnJvclRocm93KCdnZXRNdXRhdGlvbnNDcXJzUGFja2FnZScsIHtlcnJvciwgbXV0YXRpb25zUGF0aCwgbXV0YXRpb25zU3RvcmFnZVBhY2thZ2V9KVxuICB9XG59XG4iXX0=