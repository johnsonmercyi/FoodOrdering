import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { Link, Redirect } from 'expo-router';
import Button from '../components/ui/Button/Button';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '../lib/supabase';

const index = () => {
  const { session, loading } = useAuth();
  console.log(session);

  // if (loading) return <ActivityIndicator />

  // // If the user is not authenticated yet then go to the sign up page
  if (!session) {
    return <Redirect href={"/sign-in"} />
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={"/(auth)"} asChild>
        <Button text="Sign in" />
      </Link>
      <Button onPress={()=> supabase.auth.signOut()} text="Sign out" />
    </View>
  );
};

export default index;