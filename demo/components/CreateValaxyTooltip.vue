<script lang="ts" setup>
import pkg from 'valaxy/package.json' with { type: 'json' }
</script>

<template>
  <div text="white sm" bg="dark" rounded-lg>
    <pre>
  🌌 Valaxy  <span text-blue>v{{ pkg.version }}</span>

<span text-cyan>?</span> Select a type: <span op="70">› - Use arrow-keys. Return to submit.</span>
<span text-cyan>❯   Blog <span op="70">- For Most Users</span></span> <span text-purple>【Press Enter】</span>
    <span text-green>Theme <span op="70">- For Theme Developers</span></span>
    <span text-yellow>Addon <span op="70">- For Addon Developers</span></span>

<span text-cyan>?</span> Project name: <span op="70">› valaxy-blog</span> <span text-purple>【Press Enter】</span>
  📁 <span op="70">/root/repos/valaxy-blog</span>

  <span op="70">Scaffolding project in</span> valaxy-blog <span op="70">...</span>
  <span text-green>Done.</span>

<span text-cyan>?</span> Install and start it now? <span op="70">› (Y/n)</span> <span text-purple>Press Y</span>

<span text-cyan>?</span> Choose the agent <span op="70">› - Use arrow-keys. Return to submit.</span>
    npm
    yarn
<span text-cyan>❯   pnpm </span><span text-purple>【Press Enter】</span>
<!-- Done in 20.5s. --></pre>
    <!-- > valaxy-blog@0.0.0 dev /root/repos/valaxy-blog
> valaxy

✔ Resolve valaxyConfig from /root/repos/valaxy-blog/valaxy.config.ts
✔ Resolve siteConfig from /root/repos/valaxy-blog/site.config.ts
✔ Resolve valaxy.config.ts from theme(yun)
✔ Resolve addons from /root/repos/valaxy-blog

  🌌 Valaxy  v0.15.5

  🪐 theme   > yun
  📁 /root/repos/valaxy-blog

  Preview    > http://localhost:4860/
  Network    > http://172.19.185.146:4860/

  shortcuts  > restart | open | qr | edit -->
  </div>
</template>
