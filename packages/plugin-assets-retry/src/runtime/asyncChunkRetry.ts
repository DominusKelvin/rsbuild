import type {} from '@rsbuild/core';
declare global {
  // runtimeGlobals.ensure
  var __RUNTIME_GLOBAL_ENSURE__CHUNK__: (chunkId: string) => Promise<any>;
  // maxRetries
  var __MAX_RETRIES__: number;
}

// rsbuild/async-chunk-retry/runtime
const countMap: Record<string, number> = {};
const oldLoadScript = __RUNTIME_GLOBAL_ENSURE__CHUNK__;

function newLoadScript(chunkId: string) {
  const result = oldLoadScript(chunkId);
  return result.catch(function (error) {
    const retries = countMap[chunkId] ?? __MAX_RETRIES__;

    if (retries < 1) {
      error.message = `Loading chunk ${chunkId} failed after  retries.`;
      throw error;
    }
    // biome-ignore lint/complexity/useArrowFunction: use function to have better performance
    return new Promise(function (resolve) {
      const retryAttempt = __MAX_RETRIES__ - retries + 1;
      setTimeout(() => {
        // var retryAttemptString = '&retry-attempt=' + retryAttempt;
        // var cacheBust = ${getCacheBustString()} + retryAttemptString;
        // queryMap[chunkId] = cacheBust;
        countMap[chunkId] = retries - 1;
        resolve(__RUNTIME_GLOBAL_ENSURE__CHUNK__(chunkId));
      }, 300);
    });
  });
}

__RUNTIME_GLOBAL_ENSURE__CHUNK__ = newLoadScript;
