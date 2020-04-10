declare module "react-native-read-sms" {
    interface Listener {
        on(
            status: string, // success/error
            sms: string,
            error: any
        ): Listener;

        // then(fn: (snapshot: Listener) => void): Promise<any>;

        // catch(fn: (error: Error) => void): Promise<any>;
    }
    export function startReadSMS(): Listener;
    export function stopReadSMS(): void;
    export function requestReadSMSPermission(): void;
}
