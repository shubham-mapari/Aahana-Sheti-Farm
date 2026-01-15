import { supabase } from "./supabaseClient";

export const loginAdmin = async (email, password) => {
    // Always allow these local admin bypasses for convenience
    const cleanEmail = email.trim().toLowerCase();
    if ((cleanEmail === 'admin@aahana.com' || cleanEmail === 'aahanashetifarm@gmail.com') && password === 'Aahana@2026') {
        const mockUser = { email: cleanEmail, id: 'dev-user-123' };
        localStorage.setItem('mockUser', JSON.stringify(mockUser));
        return mockUser;
    }

    if (!supabase) {
        throw new Error("Supabase URL missing in .env. Please restart npm start.");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;
    return data.user;
};

export const updatePassword = async (newPassword) => {
    if (!supabase) throw new Error("Supabase not connected");
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
    return true;
};

export const inviteAdmin = async (email) => {
    if (!supabase) throw new Error("Supabase not connected");

    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);
    if (error) throw error;
    return data;
};

export const resetPassword = async (email) => {
    if (!supabase) {
        alert("Development Bypass: Password reset link sent to " + email);
        return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/update-password',
    });
    if (error) throw error;
};

export const logoutAdmin = async () => {
    localStorage.removeItem('mockUser');
    if (supabase) {
        const { error } = await supabase.auth.signOut();
        if (error) console.error("Error logging out:", error);
    }
};

export const subscribeToAuthChanges = (callback) => {
    const mockUser = localStorage.getItem('mockUser');
    if (mockUser) {
        callback(JSON.parse(mockUser));
    }

    if (!supabase) return () => { };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
            // This event is triggered when user lands via reset link
        }
        if (session) {
            callback(session.user);
        } else {
            if (!localStorage.getItem('mockUser')) {
                callback(null);
            }
        }
    });

    return () => subscription.unsubscribe();
};
