# react-native-read-sms

# React native plugin for Read SMS
	This plugin is used to read new received SMS.
	Supported and tested up to React Native V0.61.5

## Getting started

`$ npm install react-native-read-sms --save`

### Mostly automatic installation

`$ react-native link react-native-read-sms`

## Usage

To enable `Read SMS` feature you have to add the following code to the `AndroidManifest.xml`:

```java
  <uses-permission android:name="android.permission.RECEIVE_SMS" />
  <uses-permission android:name="android.permission.READ_SMS" />
```

```javascript
import * as ReadSms from 'react-native-read-sms/ReadSms';

/*
* use to start read new recived messages
*/
ReadSms.startReadSMS((status, sms, error) => {
	if (status == "success") {
		this.extractNumber(sms);
	}
});

/*
* use to stop read messages
*/
ReadSms.stopReadSMS();

/*
* use to request Read SMS Permission
*/
ReadSms.requestReadSMSPermission();
```
