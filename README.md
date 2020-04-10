# React native plugin for Read SMS
	This plugin is used to read any new upcoming SMS. 
	Supported and tested up to React Native V0.61.5

## Getting started

`$ npm install react-native-read-sms --save`

### Mostly automatic installation

To enable `Read SMS` feature you have to add the following code to the `AndroidManifest.xml`:

```java
  <uses-permission android:name="android.permission.RECEIVE_SMS" />
  <uses-permission android:name="android.permission.READ_SMS" />
```

For react-native < V0.59.0
`$ react-native link react-native-read-sms`


## Basic usage example:

```javascript
import React, { Component } from "react";
import * as ReadSms from 'react-native-read-sms/ReadSms';

export default class ReadSMSComponent extends Component {

	constructor(props) {
	    super(props);
	}
  
	componentWillMount = () => {
	    this.startReadSMS();
	}
	
	startReadSMS = async () => {
	    const hasPermission = await ReadSms.requestReadSMSPermission();
	    if(hasPermission) {
	        ReadSms.startReadSMS((status, sms, error) => {
	            if (status == "success") {
	                console.log("Great!! you have received new sms:", sms);
	            }
	        });
	    }
	}

	componentWillUnmount = () => {
	    ReadSms.stopReadSMS();
	}
}
```