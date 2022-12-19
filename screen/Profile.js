import {useEffect, useState} from 'react';
import {SafeAreaView, Text, StyleSheet, View, Image} from 'react-native';
import * as SQLite from 'expo-sqlite';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Edit from '../assets/Edit';

const db = SQLite.openDatabase('users.db');

const Profile = ({route}) => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [position, setPosition] = useState();
  const [contact, setContact] = useState();
  const account = route.params.currentEmail;
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM users WHERE email='${account}'`,
        [],
        (tx, results) => {
          const row = results.rows.item(0);
          setEmail(row.email);
          setName(row.name);
          setPhone(row.phone);
          setPosition(row.position);
          setContact(row.skype);
        },
      );
    });
  }, []);

  const onUpdate = () => {
    db.transaction(tx => {
      const updateName = `name='${name}'`;
      const updatePos = `position='${position}'`;
      const updatePhone = `phone='${phone}'`;
      const updateSkype = `skype='${contact}'`;
      tx.executeSql(
        `UPDATE users SET ${updateName}, ${updatePos}, ${updatePhone}, ${updateSkype}`,
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.photo_block}>
        <Image source={require('../assets/Photo.png')} />
        <Edit style={styles.edit_button} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.position}>{position}</Text>
      <CustomInput setVal={setName} vals={name} name="name" />
      <CustomInput
        setVal={setEmail}
        vals={email}
        type="email-address"
        name="email"
      />
      <CustomInput setVal={setPhone} vals={phone} name="phone" />
      <CustomInput setVal={setPosition} vals={position} name="position" />
      <CustomInput setVal={setContact} vals={contact} name="skype" />
      <CustomButton text="save" pressFunc={onUpdate} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  name: {
    color: '#1F1D1D',
    fontSize: 24,
  },
  position: {
    color: '#9795A4af',
    fontSize: 14,
  },
  text_log_out: {
    fontSize: 16,
    color: '#FFC612',
  },
  photo_block: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  edit_button: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

export default Profile;
