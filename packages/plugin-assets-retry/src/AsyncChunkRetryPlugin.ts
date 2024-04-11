import { Rspack } from '@rsbuild/shared/rspack';

const { RuntimeGlobals } = Rspack;

function appendScript(module: any, appendSource: string) {
  const source = module.source?.source?.toString();
  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  (module.source ??= {} as any).source = Buffer.from(
    `${source}\n${appendSource}`,
    'utf-8',
  );
}

class AsyncChunkRetryPlugin implements Rspack.RspackPluginInstance {
  readonly name = 'ASYNC_CHUNK_RETRY_PLUGIN';

  apply(compiler: Rspack.Compiler): void {
    compiler.hooks.thisCompilation.tap(this.name, (compilation) => {
      compilation.hooks.runtimeModule.tap(this.name, (module, _chunk) => {
        const maxRetries = 3;
        function getCacheBustString() {
          return '';
        }
        if (module.constructorName === 'EnsureChunkRuntimeModule') {
          const appendSource = `
          // rsbuild/asset-retry/runtime
          !function() {
            var countMap = {};

            var oldLoadScript = ${RuntimeGlobals.ensureChunk};
            ${RuntimeGlobals.ensureChunk} = function(chunkId){
              var result = oldLoadScript(chunkId);
              return result.catch(function(error){
                var retries = countMap.hasOwnProperty(chunkId) ? countMap[chunkId] : ${maxRetries};
                if (retries < 1) {
                  var realSrc = oldGetScript(chunkId);
                  error.message = 'Loading chunk ' + chunkId + ' failed after ${maxRetries} retries.\\n(' + realSrc + ')';
                  error.request = realSrc;${''}
                  throw error;
                }
                return new Promise(function (resolve) {
                  var retryAttempt = ${maxRetries} - retries + 1;
                  setTimeout(function () {
                    // var retryAttemptString = '&retry-attempt=' + retryAttempt;
                    // var cacheBust = ${getCacheBustString()} + retryAttemptString;
                    // queryMap[chunkId] = cacheBust;
                    countMap[chunkId] = retries - 1;
                    resolve(${RuntimeGlobals.ensureChunk}(chunkId));
                  }, 300)
                })
              });
            };
          }()
          `;
          appendScript(module, appendSource);
        }
      });
    });
  }
}

export { AsyncChunkRetryPlugin };
