
-- Create a table for user profiles
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  facebook_id text,
  twitter_id text,
  linkedin_id text,
  google_id text,
  
  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- Create a secure function to handle profile updates
create or replace function public.handle_social_login()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  -- Check if a profile exists
  if not exists (select 1 from public.profiles where id = new.id) then
    insert into public.profiles (
      id,
      updated_at,
      username,
      full_name,
      avatar_url
    ) values (
      new.id,
      now(),
      new.raw_user_meta_data->>'preferred_username',
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'avatar_url'
    );
  else
    -- Update existing profile with new social info
    update public.profiles
    set
      updated_at = now(),
      full_name = coalesce(new.raw_user_meta_data->>'full_name', full_name),
      avatar_url = coalesce(new.raw_user_meta_data->>'avatar_url', avatar_url)
    where id = new.id;
  end if;
  return new;
end;
$$;

-- Create a trigger to handle new sign ups and social connections
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_social_login();

create trigger on_auth_user_updated
  after update on auth.users
  for each row execute procedure public.handle_social_login();
