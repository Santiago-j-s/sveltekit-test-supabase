<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(async () => {
    const { searchParams } = new URL(window.location.href);
    const code = searchParams.get('code');

    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        goto('/');
      }
    }
  });
</script>

<div class="flex items-center justify-center h-screen">
  <div class="text-center">
    <h1 class="text-2xl font-bold mb-4">Confirming your email...</h1>
    <p class="text-gray-600">Please wait while we verify your email address.</p>
  </div>
</div> 