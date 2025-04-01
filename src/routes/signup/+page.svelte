<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let loading = false;
  let error: string | null = null;

  async function handleSignUp() {
    try {
      loading = true;
      error = null;
      
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      // Show success message or redirect
      alert('Check your email for the confirmation link!');
      goto('/');
    } catch (e: unknown) {
      error = e instanceof Error ? e.message : 'An error occurred during sign up';
    } finally {
      loading = false;
    }
  }
</script>

<div class="flex flex-col gap-4 max-w-md mx-auto justify-center h-screen p-4">
  <h1 class="text-2xl font-bold text-center mb-8">Sign Up</h1>
  
  <form on:submit|preventDefault={handleSignUp} class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <label for="email" class="text-sm font-medium">Email</label>
      <input
        type="email"
        id="email"
        bind:value={email}
        required
        class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="your@email.com"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label for="password" class="text-sm font-medium">Password</label>
      <input
        type="password"
        id="password"
        bind:value={password}
        required
        class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="••••••••"
      />
    </div>

    {#if error}
      <div class="text-red-500 text-sm">{error}</div>
    {/if}

    <button
      type="submit"
      disabled={loading}
      class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Signing up...' : 'Sign Up'}
    </button>
  </form>

  <p class="text-center text-sm text-gray-600">
    Already have an account? 
    <a href="/login" class="text-blue-500 hover:underline">Log in</a>
  </p>
</div> 