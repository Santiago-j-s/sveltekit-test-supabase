<script>
  let { data } = $props();
</script>

<div class="flex flex-col gap-4 max-w-2xl mx-auto justify-center h-screen">
  {#if data.session}
    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
      <strong class="font-bold">Welcome back!</strong>
      <span class="block sm:inline"> You are signed in as {data.session.user.email}</span>
    </div>
    <div class="flex flex-col gap-4">
      {#each data.notes as note}
        <div class="bg-gray-100 rounded-md p-4">{note.text}</div>
      {/each}
    </div>
  {:else}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
      <strong class="font-bold">You are not signed in</strong>
      <span class="block sm:inline"><a href="/signup" class="text-blue-500 hover:text-blue-700">Please sign in to continue</a></span>
    </div>
  {/if}

</div>