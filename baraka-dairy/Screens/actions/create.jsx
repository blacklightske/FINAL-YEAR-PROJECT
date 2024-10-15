import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Dimensions, Alert } from 'react-native';
import { CustomButton, FormField, SearchInput } from '../../components';
import { useGlobalContext } from '../../context/GlobalProvider';
import {BACKEND_URL} from "@env" ;

const Create = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    userId: '',
    records: '',
  });

  const submit = async () => {
    if (form.userId === '' || form.records === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem('token'); // Adjust if you use another method for storing token
      await fetch('${BACKEND_URL}/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const result = await fetch('${BACKEND_URL}/currentUser', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await result.json();
      setUser(userData);
      setIsLogged(true);

      Alert.alert('Success', 'User signed in successfully');
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get('window').height - 100,
          }}
        >
          <Text className="text-3xl font-semibold text-white mt-10 font-psemibold">
            New Farmer Records
          </Text>

          <FormField
            title="Farmer number"
            value={form.userId}
            handleChangeText={(e) => setForm({ ...form, userId: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Milk records"
            value={form.records}
            handleChangeText={(e) => setForm({ ...form, records: e })}
            otherStyles="mt-7"
          />
          <View className="mt-10">
            <Text className="text-1xl font-semibold text-white mt-10 ml-20 font-psemibold">
              Enter Date
            </Text>
          </View>

          <CustomButton
            title="Submit"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <Text className="text-2xl font-semibold text-white mt-20 font-psemibold">
            Update Farmer records
          </Text>

          <Text className="text-1xl font-semibold text-white mt-10 ml-20 font-psemibold">
            Enter Farmer Number
          </Text>

          <View className="mt-2">
            <SearchInput title="farmer number" placeholderText="farmer number " />
          </View>

          <Text className="text-1xl font-semibold text-white mt-10 ml-32 font-psemibold">
            Enter Date
          </Text>

          <View className="mt-10">
            <SearchInput placeholderText="day/month " />
          </View>

          <CustomButton
            title="Update farmer records"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
