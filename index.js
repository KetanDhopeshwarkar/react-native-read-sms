import { NativeEventEmitter, NativeModules, PermissionsAndroid, Platform } from "react-native";

export function startReadSMS() {
    console.log("aa ---------- in startReadSMS");

    let resultFun = (status, sms, error) => {
        console.log("status==>", status);
        console.log("sms==>", sms);
        console.log("error==>", error);
    }
    if (Platform.OS === 'android') {
        const hasSMSPermission = await this.hasSMSPermission();
        if (hasSMSPermission) {
            NativeModules.ReadSms.startReadSMS(result => {
                new NativeEventEmitter(NativeModules.ReadSms)
                    .addListener('received_sms', (sms) => {
                        resultFun("success", sms);
                    });
            }, error => {
                console.log("startReadSMS error=>", error);
                resultFun("error", '', error);
            });
        } else {
            resultFun("error", '', "Required RECEIVE_SMS and READ_SMS permission");
        }
    } else {
        resultFun("error", '', "ReadSms Plugin is only for android platform");
    }
    return resultFun;
}

hasSMSPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
        return true;
    }
    const hasReceiveSmsPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
    );
    const hasReadSmsPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_SMS
    );
    if (hasReceiveSmsPermission && hasReadSmsPermission) return true;
    return false;
}

export async function requestReadSMSPermission() {
    if (Platform.OS === 'android') {
        if (this.hasSMSPermission()) return true;
        const status = await PermissionsAndroid.requestMultiple(
            [PermissionsAndroid.PERMISSIONS.RECEIVE_SMS, PermissionsAndroid.PERMISSIONS.READ_SMS]
        );
        if (status === PermissionsAndroid.RESULTS.GRANTED) return true;
        if (status === PermissionsAndroid.RESULTS.DENIED) {
            console.log('Read Sms permission denied by user.', status);
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            console.log('Read Sms permission revoked by user.', status);
        }
        return false;
    }
}

export function stopReadSMS() {
    if (Platform.OS === 'android') {
        ReadSms.stopReadSMS();
    }
}