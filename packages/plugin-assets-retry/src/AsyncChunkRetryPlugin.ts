import { fse } from '@rsbuild/shared';
import { Rspack } from '@rsbuild/shared/rspack';
import path from 'node:path';
import type { PluginAssetsRetryOptions } from './types';

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
  readonly options: PluginAssetsRetryOptions;

  constructor(options: PluginAssetsRetryOptions) {
    this.options = options;
  }

  getRawRuntimeRetryCode() {
    const filename = 'asyncChunkRetry';
    const runtimeFilePath = path.join(
      __dirname,
      'runtime',
      this.options?.minify ? `${filename}.min.js` : `${filename}.js`,
    );
    const rawText = fse.readFileSync(runtimeFilePath, 'utf-8');
    const maxRetries = 3;

    return rawText
      .replaceAll(
        '__RUNTIME_GLOBAL_ENSURE__CHUNK__',
        RuntimeGlobals.ensureChunk,
      )
      .replaceAll('__MAX_RETRIES__', String(maxRetries));
  }

  apply(compiler: Rspack.Compiler): void {
    compiler.hooks.thisCompilation.tap(this.name, (compilation) => {
      compilation.hooks.runtimeModule.tap(this.name, (module, _chunk) => {
        if (module.constructorName === 'EnsureChunkRuntimeModule') {
          const runtimeCode = this.getRawRuntimeRetryCode();
          appendScript(module, runtimeCode);
        }
      });
    });
  }
}

export { AsyncChunkRetryPlugin };
