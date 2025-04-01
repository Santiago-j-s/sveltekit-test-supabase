import type { PageLoad } from './$types';
import { supabase } from '$lib/supabaseClient';

export const load: PageLoad = async () => {
	const { data: notes, error: notesError } = await supabase.from('notes').select('*');
	const {
		data: { session },
		error: sessionError
	} = await supabase.auth.getSession();

	if (notesError) {
		throw notesError;
	}

	if (sessionError) {
		throw sessionError;
	}

	return {
		notes: notes ?? [],
		session
	};
};
