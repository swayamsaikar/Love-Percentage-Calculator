import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import MyHeader from './components/header';
import { Input, Button } from 'react-native-elements';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'ssk',
      secondName: 'kk',
      percentage: '',
      description: '',
      loading: true,
    };
  }

  getData = async () => {
    if (!this.state.firstName && !this.state.secondName) {
      alert('Please fill  in the input properly');
    } else {
      try {
        var req = await fetch(
          `https://love-calculator.p.rapidapi.com/getPercentage?fname=${this.state.firstName}%20&sname=${this.state.secondName}`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key':
                'c28ec5a875msh4e4f2ac8694782ep173c04jsn739b46461b0e',
              'x-rapidapi-host': 'love-calculator.p.rapidapi.com',
            },
          }
        );
        var res = await req.json();
        this.setState({
          percentage: res.percentage,
          description: res.result,
          loading: false,
        });
      } catch (err) {
        alert(err);
      }
    }
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    return (
      <View>
        <MyHeader title="Love Calculator" color="#fff" />
        <View
          style={{
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('./InAppImage.png')}
            style={{ width: 100, height: 100 }}
          />
          <Text style={{ fontSize: 25 }}>Love Calculator</Text>
        </View>
        <Input
          placeholder="Person1"
          leftIcon={<Ionicons name="person" size={24} color="black" />}
          style={{ marginLeft: 5, fontSize: 20 }}
          onChangeText={(firstName) => this.setState({ firstName: firstName })}
        />
        <Input
          placeholder="Person2"
          leftIcon={<Ionicons name="person" size={24} color="black" />}
          style={{ marginLeft: 5, fontSize: 20 }}
          onChangeText={(secondName) =>
            this.setState({ secondName: secondName })
          }
        />
        <Button
          title="Calculate"
          type="solid"
          iconRight={true}
          titleStyle={{ fontSize: 20 }}
          icon={
            <AntDesign
              name="heart"
              size={24}
              color="#fff"
              style={{ marginLeft: 10 }}
            />
          }
          containerStyle={{
            width: '90%',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          onPress={() => {
            this.getData();
          }}
        />

        <View
          style={{
            width: '90%',
            height: '30%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {this.state.loading ? (
            <View>
              <ActivityIndicator size={70} color="purple" />
              <Text style={[styles.textStyle, { fontSize: 25 }]}>No Data</Text>
            </View>
          ) : (
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.textStyle}>
                First Name :-
                {this.state.firstName
                  ? this.state.firstName
                  : 'Please Write The first name'}
              </Text>
              <Text style={styles.textStyle}>
                Second Name:-
                {this.state.secondName
                  ? this.state.secondName
                  : 'Please Write The second name'}
              </Text>
              <Text style={styles.textStyle}>
                Percentage :-
                {this.state.percentage
                  ? this.state.percentage
                  : 'Please fill The Input correctly to show the percentage'}
              </Text>
              <Text style={styles.textStyle}>
                Description :-
                {this.state.description
                  ? this.state.description
                  : 'Please fill the input correctly to show the description'}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 22,
    fontWeight: '300',
  },
});

// Developed By Swayam sai kar using Love Calculator Api