-- ============================================================================
-- SUPABASE SETUP: Create users table with trigger and RLS policies
-- ============================================================================
-- Jalankan SQL ini di Supabase SQL Editor untuk:
-- 1. Membuat tabel users dengan struktur yang tepat
-- 2. Membuat trigger otomatis saat user signup
-- 3. Mengaktifkan RLS dan policy yang aman
-- ============================================================================

-- Step 1: Buat tabel users jika belum ada
-- (jalankan hanya jika tabel users belum ada)
/*
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  username text,
  role text DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Buat index untuk query yang lebih cepat
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
*/

-- Contoh skema tabel sesuai permintaan:
-- id: uuid, NOT NULL (primary key)
-- username: text, NOT NULL
-- phone: text, nullable
-- password: text, NOT NULL
-- role: text, nullable
-- total_order: integer, nullable
-- created_at: timestamp without time zone, nullable
/*
CREATE TABLE IF NOT EXISTS public.users_custom (
  id uuid PRIMARY KEY,
  username text NOT NULL,
  phone text,
  password text NOT NULL,
  role text,
  total_order integer,
  created_at timestamp without time zone
);
*/

-- Step 2: Aktifkan Row Level Security (RLS) pada tabel users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Step 3: Buat policy untuk INSERT (authenticated user insert profil mereka sendiri)
CREATE POLICY "Users can insert own profile"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Step 4: Buat policy untuk SELECT (authenticated user baca profil mereka sendiri)
CREATE POLICY "Users can read own profile"
ON public.users
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Step 5: Buat policy untuk UPDATE (authenticated user update profil mereka sendiri)
CREATE POLICY "Users can update own profile"
ON public.users
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Step 6: (OPSIONAL) Buat policy untuk admin membaca semua user
-- Uncomment jika ada admin role yang perlu baca semua user
/*
CREATE POLICY "Admin can read all users"
ON public.users
FOR SELECT
TO authenticated
USING (
  (SELECT auth.jwt() ->> 'user_role') = 'admin'
  OR auth.uid() = id
);
*/

-- ============================================================================
-- PRICING TABLE RLS
-- ============================================================================
-- Pricing dipakai untuk ditampilkan ke publik, tetapi dikelola dari panel admin.
-- Policy di bawah ini mengizinkan data pricing dibaca oleh app, dan mengizinkan
-- authenticated user menambah/mengubah/menghapus pricing.
-- Jika Anda ingin benar-benar admin-only, ganti policy authenticated ini
-- dengan pengecekan role admin yang konsisten di JWT atau tabel profile.
ALTER TABLE public.pricing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read pricing"
ON public.pricing
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Authenticated users can insert pricing"
ON public.pricing
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update pricing"
ON public.pricing
FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete pricing"
ON public.pricing
FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL);

-- Step 7: Buat trigger function untuk otomatis insert ke users table saat signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (
    id,
    email,
    username,
    role,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user'),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 8: Buat trigger yang jalan saat user baru di auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- VERIFIKASI & CLEANUP (optional)
-- ============================================================================

-- Cek apakah RLS aktif
-- SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'users';

-- Cek policies yang aktif
-- SELECT schemaname, tablename, policyname, permissive, roles, qual, with_check
-- FROM pg_policies
-- WHERE tablename = 'users';

-- Cek trigger yang aktif
-- SELECT trigger_name FROM information_schema.triggers
-- WHERE event_object_table = 'users';

-- Hapus trigger jika perlu di-reset
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- DROP FUNCTION IF EXISTS public.handle_new_user();

-- Hapus semua policies jika perlu di-reset
-- DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
-- DROP POLICY IF EXISTS "Users can read own profile" ON public.users;
-- DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
