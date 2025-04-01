<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let error: string | null = null;

  onMount(async () => {
    try {
      const { searchParams } = new URL(window.location.href);
      const code = searchParams.get('code');

      if (!code) {
        error = 'No code found in URL';
        return;
      }

      console.log('Exchanging code for session...');
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (exchangeError) {
        console.error('Error exchanging code:', exchangeError);
        error = exchangeError.message;
        return;
      }

      console.log('Successfully exchanged code, redirecting...');
      await goto('/', { replaceState: true });
    } catch (e) {
      console.error('Unexpected error:', e);
      error = e instanceof Error ? e.message : 'An unexpected error occurred';
    }
  });
</script>

<div class="flex items-center justify-center h-screen">
  <div class="text-center">
    <h1 class="text-2xl font-bold mb-4">Confirming your email...</h1>
    {#if error}
      <p class="text-red-500 mb-4">{error}</p>
    {:else}
      <p class="text-gray-600">Please wait while we verify your email address.</p>
    {/if}
  </div>
</div> 