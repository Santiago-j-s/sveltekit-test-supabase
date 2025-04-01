<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  onMount(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      goto('/login');
    } catch (e) {
      console.error('Error signing out:', e);
      goto('/login');
    }
  });
</script>

<div class="flex flex-col gap-4 max-w-md mx-auto justify-center h-screen p-4">
  <h1 class="text-2xl font-bold text-center mb-8">Signing out...</h1>
  <div class="text-center text-gray-600">
    Please wait while we sign you out.
  </div>
</div> 