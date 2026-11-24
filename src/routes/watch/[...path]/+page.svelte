<script lang="ts">
  let { data } = $props()
</script>

<svelte:head>
  <title>{data.title}</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<main>
  <!-- nogownload removes the download button; the context menu is suppressed
       so "Save video as…" is not one click away. This is a deterrent, not DRM:
       anything that plays can be captured. -->
  <video
    src={data.src}
    controls
    controlsList="nodownload"
    playsinline
    preload="metadata"
    oncontextmenu={(e) => e.preventDefault()}
  ></video>
</main>

<style>
  main {
    min-height: 100vh;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  video {
    width: 100%;
    max-width: 1000px;
    max-height: 100vh;
  }
</style>
